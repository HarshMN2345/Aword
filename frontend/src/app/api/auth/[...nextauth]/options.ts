import {Account, AuthOptions, ISODateString} from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { JWT } from 'next-auth/jwt';
import axios from 'axios';
import { LOGIN_URL } from '@/lib/apiEndPoints';


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
        async signIn({user,account}:{user:CustomUser,account:Account|null}): Promise<string | boolean> {
            try{
                console.log("The user data is",user);
                console.log("The account data is",account);
                const payload={
                    email:user.email,
                    name:user.name,
                    oauth_id:account?.providerAccountId,
                    provider:account?.provider,
                    image:user?.image
                }
                const {data}=await axios.post(LOGIN_URL,payload);
                user.id=data?.user?.id.toString();
                user.token=data?.user?.token;
                user.provider=data?.user?.provider;
                return true;
            }catch(error){
               return false;
            }
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