import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh] bg-white dark:bg-gray-900 p-4 transition-colors duration-300">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] md:max-w-sm rounded-lg p-3 shadow-sm ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white self-end"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-black dark:text-white self-start"
              }`}
            >
              <p className="text-sm font-bold">{message.name}</p>
              <p className="text-sm mt-1">{message.message}</p>
              <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-300"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}