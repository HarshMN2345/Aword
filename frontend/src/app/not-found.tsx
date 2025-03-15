import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function notFound() {
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
        <Image src='https://user-images.githubusercontent.com/71749153/145678444-40650a1b-c382-463b-bc22-df28c6f9c262.gif' alt='404' width={500} height={500} className='mb-2'/>
        <Link href='/'><Button>Go back home</Button></Link>
    </div>
  )
}
