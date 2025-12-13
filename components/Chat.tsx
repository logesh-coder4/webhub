'use client'
import { Send, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "bot" },
    { id: 2, text: "I need a new website design.", sender: "user" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-neutral-950">

      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm 
                ${msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
          <ImageIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
        </button>

        <input
          className="flex-1 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 
          text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
