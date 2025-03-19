import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from 'cors';
import Routes from './routes/index';
import {Server} from 'socket.io'
import { createServer } from 'http';
import { setupSocket } from './socket';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import redis from "./config/redis.config";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessage } from "../helper";
const { instrument } = require("@socket.io/admin-ui");
// import redis from './config/redis.config';
const PORT = process.env.PORT || 8000;
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:["http://localhost:3000","https://admin.socket.io/","https://admin.socket.io/#/","https://aword-a6mx.vercel.app"],
        credentials:true
    },
    transports: ['websocket'],
    adapter:createAdapter(redis)
});
instrument(io, {
    auth: false,
    mode: "development",
});
export { io };
setupSocket(io);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: ["http://localhost:3000", "https://admin.socket.io","https://aword-a6mx.vercel.app"],
    credentials: true
}));
app.get('/',(req,res)=>{
    res.send('All is well');
});
app.options('*', cors()); // Enable preflight requests for all routes
app.use("/api",Routes);
connectKafkaProducer().catch((e)=>
    console.log(`something went wirng`)
)
consumeMessage(process.env.KAFKA_TOPIC || 'chats').catch((err)=>
    `the consumer error is ${err}`
)
server.listen(PORT,()=>{
    console.log("Port is running on port "+PORT);
})

