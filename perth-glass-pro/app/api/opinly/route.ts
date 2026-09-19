import { Webhook } from "svix";
import type { OpinlyWebhookEvent } from "@opinly/backend";
import { revalidatePath, revalidateTag } from "next/cache";

const BLOG_PREFIX = process.env.OPINLY_BLOG_PREFIX ?? "/blog";

export async function POST(request: Request) {
  const svix_id = request.headers.get("svix-id");
  const svix_timestamp = request.headers.get("svix-timestamp");
  const svix_signature = request.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Invalid request", { status: 400 });
  }

  const signingSecret = process.env.OPINLY_WEBHOOK_SIGNING_SECRET;
  if (!signingSecret) {
    console.warn("OPINLY_WEBHOOK_SIGNING_SECRET is not configured");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const buf = Buffer.from(await request.arrayBuffer());
  const wh = new Webhook(signingSecret);

  let evt: OpinlyWebhookEvent;
  try {
    evt = wh.verify(buf, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as OpinlyWebhookEvent;
  } catch {
    return new Response("Error verifying webhook", { status: 400 });
  }

  if (evt.type !== "content.routes-changed") {
    return new Response("ok", { status: 200 });
  }

  // Drop cached Opinly API responses immediately in data cache.
  // Next 16+ requires `{ expire: 0 }` for immediate purge.
  (revalidateTag as any)("opinly", { expire: 0 });

  // Invalidate rendered routes that changed
  for (const route of evt.data.changed) {
    switch (route.type) {
      case "post":
        revalidatePath(`${BLOG_PREFIX}/${route.slug}`);
        break;
      case "category":
        revalidatePath(`${BLOG_PREFIX}/category/${route.slug}`);
        break;
      case "author":
        revalidatePath(`${BLOG_PREFIX}/authors/${route.slug}`);
        break;
      case "tag":
        revalidatePath(`${BLOG_PREFIX}/tag/${route.slug}`);
        break;
      case "home":
        revalidatePath(BLOG_PREFIX || "/");
        revalidatePath("/sitemap.xml");
        break;
    }
  }

  return new Response("ok", { status: 200 });
}
