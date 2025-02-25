import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=>{
            console.log("connection successfully")
        });

        mongoose.connection.on('error', (err)=>{
            console.log('error in connection', err);
        })
        await mongoose.connect(config.databaseUrl as string);
    }catch(err){
        console.error("failed database connection" , err);
        process.exit(1);
    }
}


export default connectDB;