import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/groupChat/CreateChat';
import { fetchChatGroups } from '@/fetch/FetchGroup';
import GroupChatCard from '@/groupChat/GroupChatCard';

export default async function page() {
    const session:CustomSession|null=await getServerSession(authOptions);
    const groups:Array<ChatGroupType>=await fetchChatGroups(session?.user?.token!);
    console.log("The groups are",groups);
  return (
    <div className='container mx-auto'>
        <div className='flex justify-end mt-10'>
      <CreateChat user={session?.user!}/>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
        {groups.length>0 && groups.map((group:ChatGroupType)=>(
            <GroupChatCard key={group.id} group={group} user={session?.user!}/>
        ))}
    </div>
    </div>
    
  )
}
