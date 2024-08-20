import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const tokenSchema = new Schema({
token:{type:String,required:true},
email:{type:String,required:true},
instance:{type:String,enum:['signup','recoverpassword'],required:true},
payload:{type:Schema.Types.Mixed},
expiration:{type:String,required:true}
},{timestamps:true});

const TokenModel= models.Token || model("Token", tokenSchema)
export default  TokenModel 
