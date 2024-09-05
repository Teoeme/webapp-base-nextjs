import mongoose, { Types } from "mongoose";
const { Schema, model, models } = mongoose;

const IconSchema=new Schema({
  asset_id:{type:String,required:true},
  url:{type:String,required:true},
  extension:{type:String,required:true,enum:['svg','svg+xml','png','webp']},
  resource_type:{type:String,required:true},
  size:Number
},{_id:false})

const atributteSchema = new Schema({
   Name:{type:String,required:true,unique:true},
  Options:[String],
  Icon:{type:[IconSchema]},

});

const AtributoModel= models.Atributo || model("Atributo", atributteSchema);
export default  AtributoModel

