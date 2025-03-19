import React from "react";

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <div className="hidden md:block h-screen overflow-y-auto w-1/5 bg-gray-50 dark:bg-gray-800 px-4 py-6 transition-colors duration-300">
      <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 px-2">
        Users
      </h1>
      {users.length > 0 &&
        users.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {item.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Joined:{" "}
              <span className="font-medium">
                {new Date(item.created_at).toDateString()}
              </span>
            </p>
          </div>
        ))}
    </div>
  );
}