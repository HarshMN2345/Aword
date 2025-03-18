import {io,Socket} from 'socket.io-client';
import Env from './Env';
let socket:Socket;
export const getSocket=():Socket=>{
   if(!socket){
     socket=io(Env.BACKEND_URL,{
            autoConnect:false,
             rejectUnauthorized:false,
            transports: ['websocket']
     },
    )
   }
   return socket;
}