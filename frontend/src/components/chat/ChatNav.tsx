import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="flex space-x-4 md:space-x-0 items-center">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-600 text-transparent bg-clip-text hover:from-pink-500 hover:to-purple-700 transition-all duration-300">
          {chatGroup.title}
        </h1>
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-medium hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
        {user?.name}
      </p>
    </nav>
  );
}