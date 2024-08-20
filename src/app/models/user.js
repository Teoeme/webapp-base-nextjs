import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ImageSchema=new Schema({
  asset_id:{type:String,required:true},
  url:{type:String,required:true},
  extension:{type:String,required:true,enum:['jpg','jpeg','png','webp']},
  resource_type:{type:String,required:true},
  size:Number
},{_id:false})

const userSchema = new Schema({
  Name:{type:String,required:true},
  Email:{type:String,required:true,unique:true},
  Password:{type:String,required:false},
  Role:{type:String,default:'USER_ROLE',enum:['USER_ROLE','ADMIN_ROLE','SUPERADMIN_ROLE']},
  Verificated:{type:Boolean,default:false},
  Image:{
    type:[ImageSchema],
    required:false
  }
  
});
const UserModel= models.Usuario || model("Usuario", userSchema);
export default  UserModel 
