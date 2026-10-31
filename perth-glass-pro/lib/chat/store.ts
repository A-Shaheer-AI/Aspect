import fs from "fs";
import path from "path";
import os from "os";

export interface ChatMessage {
  role: "user" | "assistant" | "owner" | "system";
  body: string;
  timestamp: string;
}

export interface LiveChatSession {
  id: string;
  customerName?: string;
  customerPhone?: string;
  isHumanTakeover: boolean;
  createdAt: string;
  updatedAt: string;
  customerLastMessageAt?: string;
  ownerLastReplyAt?: string;
  lastOwnerNotifiedAt?: string;
  messages: ChatMessage[];
}

// On Vercel / serverless runtime, process.cwd() is read-only. Use os.tmpdir() on Vercel.
const DATA_DIR = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), "data");
const CHATS_FILE = path.join(DATA_DIR, "live_chats.json");

// In-memory cache ensures zero latency and safety across warm lambda invocations
let memoryChats: LiveChatSession[] = [];
let isInitialized = false;

function ensureStorage(): LiveChatSession[] {
  if (isInitialized && memoryChats.length > 0) {
    return memoryChats;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CHATS_FILE)) {
      const bundledPath = path.join(process.cwd(), "data", "live_chats.json");
      if (fs.existsSync(bundledPath)) {
        try {
          const rawBundled = fs.readFileSync(bundledPath, "utf-8");
          fs.writeFileSync(CHATS_FILE, rawBundled, "utf-8");
          memoryChats = JSON.parse(rawBundled);
          isInitialized = true;
          return memoryChats;
        } catch {}
      }
      fs.writeFileSync(CHATS_FILE, "[]", "utf-8");
      memoryChats = [];
      isInitialized = true;
      return memoryChats;
    }
    const data = fs.readFileSync(CHATS_FILE, "utf-8");
    memoryChats = JSON.parse(data);
    isInitialized = true;
    return memoryChats;
  } catch (e) {
    console.warn("⚠️ Live chat storage fallback to memory:", e);
    isInitialized = true;
    return memoryChats;
  }
}

function persistStorage(chats: LiveChatSession[]) {
  memoryChats = chats;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CHATS_FILE, JSON.stringify(chats, null, 2), "utf-8");
  } catch (e) {
    console.warn("⚠️ Could not write live chats to disk:", e);
  }
}

export function getChatSession(id: string): LiveChatSession | undefined {
  const chats = ensureStorage();
  return chats.find(c => c.id === id);
}

export function saveOrUpdateChatSession(data: Partial<LiveChatSession> & { id: string }): LiveChatSession {
  const chats = ensureStorage();
  const existingIdx = chats.findIndex(c => c.id === data.id);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    const existing = chats[existingIdx];
    const updated: LiveChatSession = {
      ...existing,
      ...data,
      messages: data.messages || existing.messages,
      updatedAt: now
    };
    chats[existingIdx] = updated;
    persistStorage(chats);
    return updated;
  } else {
    const newSession: LiveChatSession = {
      id: data.id,
      customerName: data.customerName || "Website Visitor",
      customerPhone: data.customerPhone,
      isHumanTakeover: data.isHumanTakeover ?? false,
      createdAt: now,
      updatedAt: now,
      customerLastMessageAt: data.customerLastMessageAt || now,
      messages: data.messages || []
    };
    chats.push(newSession);
    persistStorage(chats);
    return newSession;
  }
}

export function appendChatMessage(
  sessionId: string,
  role: "user" | "assistant" | "owner" | "system",
  body: string
): LiveChatSession {
  const chats = ensureStorage();
  let session = chats.find(c => c.id === sessionId);
  const now = new Date().toISOString();

  if (!session) {
    session = {
      id: sessionId,
      customerName: "Website Visitor",
      isHumanTakeover: false,
      createdAt: now,
      updatedAt: now,
      messages: []
    };
    chats.push(session);
  }

  session.messages.push({ role, body, timestamp: now });
  session.updatedAt = now;

  if (role === "user") {
    session.customerLastMessageAt = now;
  } else if (role === "owner") {
    session.ownerLastReplyAt = now;
    session.isHumanTakeover = true;
  }

  persistStorage(chats);
  return session;
}

export function setChatHumanTakeover(sessionId: string, isTakeover: boolean): void {
  const chats = ensureStorage();
  const session = chats.find(c => c.id === sessionId);
  if (session) {
    session.isHumanTakeover = isTakeover;
    session.updatedAt = new Date().toISOString();
    persistStorage(chats);
  }
}

export function getLatestActiveChatSession(): LiveChatSession | undefined {
  const chats = ensureStorage();
  if (chats.length === 0) return undefined;
  return [...chats].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
}
