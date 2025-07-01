import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Query = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([ ]);

  const [input, setInput] = useState("");

  // ✅ Load logged-in user details
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const Message = ({ text, time, isUser }) => (
    <div className={`my-2 ${isUser ? "text-right" : "text-left"}`}>
      <div className={`inline-block px-4 py-2 rounded-lg max-w-xs text-sm ${isUser ? "bg-[#3BB5FF] text-white" : "bg-gray-100 text-gray-800"}`}>
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
        <aside className="w-1/4 border-r p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>💬</span> Queries
          </h2>
          <div className="flex justify-between items-center mb-4 text-[#3BB5FF] font-semibold">
            <div className="flex items-center gap-2">
              <img src="https://i.pravatar.cc/40?img=3" alt="avatar" className="rounded-full w-8 h-8" />
              <div>
                <div className="text-sm text-black font-medium">TEAM EZYFIX</div>
                <div className="text-xs text-gray-600">Sure, I will check that</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">5 min ago</div>
          </div>
        </aside>

        {/* Chat Window */}
        <main className="w-full md:w-3/4 flex flex-col justify-between p-6">
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={user?.avatar || "https://via.placeholder.com/40"}
                alt="User"
                className="rounded-full w-8 h-8"
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
