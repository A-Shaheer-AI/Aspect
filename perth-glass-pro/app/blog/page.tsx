import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { format } from "date-fns";

export const metadata: Metadata = {
    title: "Cleaning Tips & News | Aspect Window Cleaning",
    description: "Expert advice on window cleaning, solar panel maintenance, and property care in Perth.",
};

export default function BlogListingPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-brand-snow bg-pattern-bubbles">
            {/* Hero */}
            <section className="bg-brand-navy text-white py-20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Cleaning Tips & News
                    </h1>
                    <p className="text-xl text-brand-water/80 max-w-2xl mx-auto">
                        Expert advice for keeping your Perth property sparkling clean.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                    {post.thumbnail ? (
                                        <Image
                                            src={post.thumbnail}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-brand-slate mb-3">
                                        <Calendar className="w-4 h-4 text-action-gold" />
                                        <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                                    </div>
                                    <h2 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-brand-slate line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
                                        Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-brand-slate text-lg">No posts found yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
