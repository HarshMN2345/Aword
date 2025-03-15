import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export default async function page() {
    const session:CustomSession|null=await getServerSession(authOptions);
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <h1>Dashboard</h1>
    </div>
  )
}
