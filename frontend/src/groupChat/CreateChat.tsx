"use client";
import { Button } from "@/components/ui/button";
import { useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { ChatGroup, ChatGroupValidation } from "@/validations/groupChatValidation";
import { Input } from "@/components/ui/input";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import axios from "axios";
import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/actions/common";
export default function CreateChat({user}:{user:CustomUser}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm<ChatGroup>({
        resolver: zodResolver(ChatGroupValidation),
    });
    const onSubmit = async (payload: ChatGroup) => {
        try{
          setLoading(true);
          const {data}=await axios.post(GROUP_CHAT_URL,{
            ...payload,
            user_id:user.id
          },{
            headers:{
                Authorization:user.token
            }
          })
          if(data?.message){
              clearCache("dashboard");
              toast.success(data.message);
              setOpen(false);
          }
          setLoading(false);
        }catch(error){
            setLoading(false);
            if(error instanceof Error){
               toast.error(error.message);
            }else{
                toast.error("An error occurred. Please try again");
            }
        }
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button variant="outline">Create Group</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a Chat Group</DialogTitle>
                        <DialogDescription>
                            Once created, your chat group will be available for members to join and participate in.
                            Ensure that the group name and settings are configured correctly, as some options may not be editable later.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                           <Input placeholder="Enter Group Name" {...register("title")} />
                           <span className="text-red-500">{errors?.title?.message}</span>
                        </div>
                        <div className="mt-4">
                           <Input placeholder="Enter Passcode" {...register("passcode")} />
                           <span className="text-red-500">{errors?.passcode?.message}</span>
                        </div>
                        <div className="mt-4">
                            <Button disabled={loading}>{loading?"Processing...":"Submit"}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}
