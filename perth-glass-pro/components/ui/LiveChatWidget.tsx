"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Sparkles, CheckCheck } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant" | "owner" | "system";
  body: string;
  timestamp: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForOwner, setWaitingForOwner] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const twoMinuteTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or restore session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem("aspect_live_chat_session");
    if (savedSession) {
      setSessionId(savedSession);
      fetchSessionMessages(savedSession);
    } else {
      const newId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      setSessionId(newId);
      localStorage.setItem("aspect_live_chat_session", newId);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, waitingForOwner]);

  // Polling for owner replies or new messages every 4 seconds when chat is open
  useEffect(() => {
    if (!sessionId) return;
    const interval = setInterval(() => {
      fetchSessionMessages(sessionId);
    }, 4000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const fetchSessionMessages = async (id: string) => {
    try {
      const res = await fetch(`/api/live-chat?sessionId=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
          if (data.isHumanTakeover) {
            setWaitingForOwner(false);
            if (twoMinuteTimerRef.current) {
              clearTimeout(twoMinuteTimerRef.current);
            }
          }
        }
      }
    } catch {}
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText("");
    const tempUserMsg: ChatMessage = {
      role: "user",
      body: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/live-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: text
        })
      });

      const data = await res.json();
      if (res.ok && data.messages) {
        setMessages(data.messages);

        if (data.isFirstTurn) {
          // First turn greeting delivered immediately!
          // Now start the 2-minute human takeover window for subsequent customer actions
          setWaitingForOwner(true);
        } else if (data.waitingForOwner) {
          // Subsequent message sent before 2 minutes:
          setWaitingForOwner(true);
          // Set client 2-minute timer: If owner hasn't replied within 120s, trigger AI to answer!
          if (twoMinuteTimerRef.current) clearTimeout(twoMinuteTimerRef.current);
          twoMinuteTimerRef.current = setTimeout(async () => {
            await triggerAiTimeout(text);
          }, 120000); // 2 minutes
        }
      }
    } catch (err) {
      console.error("Live chat send error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Called when 2 minutes pass without owner intervention
  const triggerAiTimeout = async (latestQuery: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/live-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: latestQuery,
          forceAi: true
        })
      });
      const data = await res.json();
      if (res.ok && data.messages) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("AI timeout response error:", e);
    } finally {
      setIsLoading(false);
      setWaitingForOwner(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-brand-navy hover:bg-slate-900 text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.18)] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-amber-400/30"
            aria-label="Open live customer chat"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-brand-navy animate-pulse" />
            </div>
            <span className="font-semibold text-sm tracking-wide hidden sm:inline">
              Chat with Us
            </span>
            {hasUnread && (
              <span className="absolute -top-1.5 -left-1.5 px-2 py-0.5 bg-amber-500 text-brand-navy text-[10px] font-bold rounded-full uppercase tracking-wider animate-bounce">
                New
              </span>
            )}
          </button>
        )}

        {/* Live Chat Modal Card */}
        {isOpen && (
          <div
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            style={{ boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.25)" }}
          >
            {/* Header */}
            <div className="bg-brand-navy text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-amber-400/40">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-brand-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                    Aspect Support
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                      Live
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Perth Window & Glass Specialists
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <MessageSquare className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">
                    How can we help you today?
                  </h4>
                  <p className="text-xs text-slate-500 max-w-[240px] mb-4">
                    Ask about residential pricing, double-storey reach, solar cleaning, or get a quick quote.
                  </p>
                  <div className="w-full space-y-1.5">
                    {[
                      "Single storey window quote",
                      "Double storey residential clean",
                      "Do you clean solar panels?",
                      "Commercial office window cleaning"
                    ].map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="w-full text-left text-xs bg-white hover:bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200 transition-all font-medium hover:border-slate-300 active:scale-98"
                      >
                        👉 {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  const isOwner = msg.role === "owner";

                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1">
                        <span className="text-[10px] font-semibold text-slate-400">
                          {isUser ? "You" : isOwner ? "⭐ Ahmed (Owner)" : "Fazal (Aspect)"}
                        </span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? "bg-brand-navy text-white rounded-br-none"
                            : isOwner
                            ? "bg-amber-50 border border-amber-300 text-slate-900 rounded-bl-none font-medium"
                            : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                        }`}
                      >
                        {msg.body}
                      </div>
                    </div>
                  );
                })
              )}

              {/* Waiting for Owner indicator */}
              {waitingForOwner && !isLoading && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Alert sent to Ahmed. Holding for operator...</span>
                </div>
              )}

              {/* Loading Dots */}
              {isLoading && (
                <div className="flex items-center gap-1.5 p-2 text-slate-400 text-xs">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 border border-slate-200 focus-within:border-brand-navy focus-within:bg-white transition-colors">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isLoading}
                  className="p-1.5 rounded-lg bg-brand-navy text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-brand-navy transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Pure Water Window Cleaning Perth · Guaranteed Streak-Free
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
