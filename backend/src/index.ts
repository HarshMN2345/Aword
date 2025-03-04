import express from 'express';
const app=express();
const PORT=8000;
app.get('/',(req,res)=>{
    res.send('All is well');
});
app.listen(PORT,()=>{
    console.log("Port is running on port "+PORT);
})