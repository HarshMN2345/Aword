"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LoginModal from "./auth/loginModal";

export default function SessionButton({ session }: { session: any }) {
    return (
        <>
            {session ? (
                <Button variant="outline" onClick={() => signOut()}>
                    Sign Out
                </Button>
            ) : (
                <LoginModal /> // Show the login modal when the user is not signed in
            )}
        </>
    );
}
