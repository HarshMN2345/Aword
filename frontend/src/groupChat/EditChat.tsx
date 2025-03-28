import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChatGroup, ChatGroupValidation } from '@/validations/groupChatValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React, { Dispatch, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {GROUP_CHAT_URL} from '@/lib/apiEndPoints';
import { toast } from 'sonner';
import { clearCache } from '@/actions/common';

export default function EditChat({
    user, group, open, setOpen
}: {
    user: CustomUser;
    group: ChatGroupType;
    open: boolean;
    setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
    const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChatGroup>({
    resolver: zodResolver(ChatGroupValidation),
  });

  useEffect(() => {
    setValue("title", group.title);
    setValue("passcode", group.passcode);
  }, [group]);
  const onSubmit = async (payload: ChatGroup) => {
    try {
        setLoading(true);
        const { data } = await axios.put(`${GROUP_CHAT_URL}/${group.id}`, payload, {
          headers: {
            Authorization: user.token,
          },
        });
  
        if (data?.message) {
          setOpen(false);
          toast.success(data?.message);
          clearCache("dashboard");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong.please try again!");
        }
      }
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
        </div>
    )
}
