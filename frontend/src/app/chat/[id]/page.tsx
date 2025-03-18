// app/chat/[id]/page.tsx
"use client"
import React from 'react';
import ChatBase from '@/components/chat/ChatBase';

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap the `params` Promise using React.use()
    const { id } = React.use(params);

    console.log("The group id is", id);

    return (
        <div>
            <h1>Chat</h1>
            <ChatBase groupId={id} />
        </div>
    );
}