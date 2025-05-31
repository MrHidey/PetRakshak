import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations

function Bot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Store conversation history
  const [error, setError] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null); // For auto-scrolling

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const askBot = async () => {
    if (!question.trim()) return;

    // Add user message to chat
    const userMessage = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      const botMessage = { type: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [...prev, { type: "error", text: err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askBot();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Chatbot Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatbot(!showChatbot)}
        className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-4 py-3 rounded-full shadow-lg hover:from-pink-700 hover:to-rose-600 transition-all flex items-center gap-2"
        aria-label={showChatbot ? "Close chatbot" : "Open chatbot"}
      >
        <span className="text-lg">🐾</span>
        <span className="hidden sm:inline">Pet Expert</span>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-80 sm:w-96 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden"
            role="dialog"
            aria-labelledby="chatbot-title"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white p-4 flex justify-between items-center">
              <h2 id="chatbot-title" className="text-lg font-semibold">
                Pet Expert Chat
              </h2>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={chatContainerRef}
              className="h-64 sm:h-80 p-4 overflow-y-auto bg-gray-50"
              role="log"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="text-gray-500 text-sm italic text-center">
                  Ask me anything about pets, like "Can rabbits eat bananas?"
                </div>
              )}
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-3 flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      msg.type === "user"
                        ? "bg-pink-600 text-white"
                        : msg.type === "bot"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-3 rounded-lg text-sm animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your pet..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  aria-label="Type your question"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={askBot}
                  disabled={isLoading || !question.trim()}
                  className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 disabled:bg-pink-300 transition-all"
                  aria-label="Send message"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Bot;