import mongoose from "mongoose";

const connectDb=async (DATABASE_URL)=>{
    try{
const DB_OPTIONS={
dbName:'chat_db'
}
await mongoose.connect(DATABASE_URL,DB_OPTIONS)
console.log("Database Connected")
    }
    catch(error){
        console.log(error)

    }
}

export default connectDb