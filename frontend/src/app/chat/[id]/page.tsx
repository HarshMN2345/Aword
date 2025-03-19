import { Suspense, use } from 'react';
import ChatBase from '@/components/chat/ChatBase';
import notFound from '@/app/not-found';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/FetchGroup';
import { fetchChats } from '@/fetch/FetchChats';

async function ChatContent({ id }: { id: string }) {
  const [chatGroup, chatGroupUsers, chats] = await Promise.all([
    fetchChatGroup(id),
    fetchChatGroupUsers(id),
    fetchChats(id),
  ]);
  console.log("chatgroup",chatGroup);
  console.log("chatgorupusers ",chatGroupUsers)
  console.log("chats",chats)

  if (!chatGroup) return notFound();

  return <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />;
}

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    console.log('Received ID:', id); 
  
  if (id.length !== 36) {
    return notFound();
  }

  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatContent id={id} />
    </Suspense>
  );
}