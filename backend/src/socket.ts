import { Server, Socket } from "socket.io";
import prisma from "./config/db.config";
import { produceMessage } from "../helper";
interface CustomSocket extends Socket{
    room?:string
}
export function setupSocket(io:Server){
    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
          return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
      });
    io.on('connection',(socket:CustomSocket)=>{
        if(socket.room){
            socket.join(socket.room);
        }
        console.log("The socket is connected",socket.id);
        socket.on('message',async (data)=>{
            // await prisma.chats.create({
            //     data:data
            // })
            const kafkaTopic = process.env.KAFKA_TOPIC || 'chats';
            await produceMessage(kafkaTopic, data)
            if(socket.room){
                socket.to(socket.room).emit("message", data);
            }
            console.log("The socket message is",data);

        })
        socket.on('disconnect',()=>{
            console.log("A user is disconnected",socket.id);
        })
    })
}