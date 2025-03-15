import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function UserAvatar({name,image}:{name:string,image:string}) { 
  return (
    <div>
      <Avatar>
  <AvatarImage  src={image} />
  <AvatarFallback>{name}</AvatarFallback>
</Avatar>
    </div>
  )
}
