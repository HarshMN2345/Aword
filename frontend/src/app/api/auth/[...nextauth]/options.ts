import {AuthOptions, ISODateString} from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { JWT } from 'next-auth/jwt';


export interface CustomSession{
    user?:CustomUser;
    expires:ISODateString
}
export interface CustomUser{
    id?:string|null;
    name?:string|null;
    email?:string|null;
    image?:string|null;
    token?:string|null;
    provider?:string|null;
}
export const authOptions:AuthOptions={
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/"
    },
    callbacks:{
        async signIn({user,account}): Promise<string | boolean> {
           console.log("The user data is",user);
           console.log("The account data is",account);
           return true; // or return a string or boolean based on your logic
        },
        async session({session,token}:{session:CustomSession,user:CustomUser,token:JWT}){
            session.user=token.user as CustomUser;
            return session;
        },
        async jwt({token,user}){
            if(user){
                token.user=user;
            }
            return token;
        }
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
          })
    ]
}