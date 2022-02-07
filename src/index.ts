import express ,{Application,Request,Response} from "express";
import dotenv from "dotenv";
import db from './database'
import client from "./database";
const app:Application=express()
const port = process.env.port || 3000
app.use(express.json())

//test database

db.connect().then(client=>{
    return client.query('SELECT NOW()').then(res=>{
        client.release();
        console.log(res.rows);
    }).catch(err=>{
        client.release();
        console.log(err.stack);
    })
})




app.listen(port,()=>{
console.log(`Server Is Running on Port ${port}`)
})
