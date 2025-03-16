import {z} from 'zod';


export const ChatGroupValidation=z.object({
   title:z.string().min(4,{message:'Chat Title must be 4 characters long'}).max(191,{message:'Chat Title must be less than 191 characters long'}),
    passcode:z.string().min(4,{message:'Passcode must be 4 characters long'}).max(26,{message:'Passcode must be less than 26 characters long'})
}).required();

export type ChatGroup=z.infer<typeof ChatGroupValidation>;