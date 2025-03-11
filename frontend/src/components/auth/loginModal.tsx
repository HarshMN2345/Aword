"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModal() {
    const handleLogin = () => {
        signIn("google",{
            callbackUrl: "/dashboard",
            redirect: true
        })
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Sign In</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Whoa… Ready to Enter Aword?! 🚀</DialogTitle>
                    <DialogDescription>
                        This isn't just any button press—it's your gateway to **legendary** conversations! 🌟
                        Once you step in, theres **no turning back**—only deep talks, wild debates, and epic connections. 🗣️🔥
                        Meet the real ones. **Drop your first message. Make your mark.**
                        Are you ready to become a part of something **legendary**? 😏
                    </DialogDescription>
                </DialogHeader>
                <Button variant="outline" onClick={handleLogin}>
                    <Image src="/images/google.jpeg" alt="google" width={20} height={20} className="mr-2" />
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>
    );
}
