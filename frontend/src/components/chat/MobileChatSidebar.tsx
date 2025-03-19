"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function MobileChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors duration-300" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-50 dark:bg-gray-800 w-64">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Users
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {users.length > 0 &&
            users.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-3"
              >
                {/* User Details */}
                <div>
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
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}