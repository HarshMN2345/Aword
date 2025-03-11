import express from 'express';
const app=express();
import cors from 'cors';
const PORT=8000;
import Routes from './routes/index';
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.get('/',(req,res)=>{
    res.send('All is well');
});
app.use("/api",Routes);
app.listen(PORT,()=>{
    console.log("Port is running on port "+PORT);
})

