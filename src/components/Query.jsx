import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";

const presetQueries = [
  "How do I redeem my coupon?",
  "My payment failed, what should I do?",
  "Can I get a refund on coins?",
  "Coupon code not working",
  "Need help with my transaction history"
];

const Query = () => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Welcome to EzyFix Support. Please describe your issue or query in detail, and we will get back to you as soon as possible.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: false,
    },
  ]);

  const chatRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage(input);
    setInput("");
  };

  const sendMessage = (text) => {
    const newMsg = {
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    };

    const reply = {
      text: "Thanks for reaching out. Our support team will respond shortly.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: false,
    };

    setMessages((prev) => [...prev, newMsg, reply]);
    scrollToBottom();
  };

  const handleQueryClick = (text) => {
    sendMessage(text);
  };

  const Message = ({ text, time, isUser }) => (
    <div className={`my-2 ${isUser ? "text-right" : "text-left"}`}>
      <div
        className={`inline-block px-4 py-2 rounded-lg max-w-xs text-sm ${
          isUser ? "bg-[#3BB5FF] text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {text}
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 border-r p-4 hidden md:flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>💬</span> Queries
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <img
              src="/logo.png"
              alt="EzyFix"
              className="w-10 h-10 object-contain rounded"
            />
            <div>
              <div className="text-sm font-semibold text-black">EzyFix Support</div>
              <div className="text-xs text-gray-600">Ask your queries here</div>
            </div>
          </div>

          <div className="space-y-2">
            {presetQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => handleQueryClick(query)}
                className="w-full text-left text-sm text-[#3BB5FF] hover:bg-[#f0f9ff] p-2 rounded"
              >
                {query}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="w-full md:w-3/4 flex flex-col justify-between p-6">
          <div ref={chatRef} className="flex-1 overflow-y-auto pr-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt="User"
                className="rounded-full w-8 h-8 object-cover"
              />
              <h2 className="text-lg font-semibold">{user?.name || "Guest User"}</h2>
            </div>
            {messages.map((msg, index) => (
              <Message key={index} {...msg} />
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 border-t pt-4">
            <input
              type="text"
              className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3BB5FF]"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#3BB5FF] text-white px-4 py-2 rounded hover:bg-[#2DA7ED] transition"
            >
              Send
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t mt-4">
        <h2 className="text-lg font-semibold">EzyFix</h2>
        <p className="text-sm text-gray-500 mb-2">Stay updated with the latest coupons!</p>
        <div className="flex justify-center gap-2 mb-2">
          <input
            type="email"
            placeholder="Your email address"
            className="border rounded px-3 py-1 w-64 text-sm"
          />
          <button className="bg-[#3BB5FF] text-white px-4 py-1 rounded">Subscribe</button>
        </div>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} EzyFix.</p>
      </footer>
    </div>
  );
};

export default Query;
