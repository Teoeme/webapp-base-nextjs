import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const configuracionSchema = new Schema({
  name:{type:String,unique:true},
  label:String,
  value:{type:Schema.Types.Mixed,required:true},
  description:String,
  protected:{type:Boolean,default:true},
  type:{type:String,required:true,enum:['string','image','images','number']},
  group:String,
  helperText:{type:String}
  
},{timestamps:true});
const ConfiguracionModel= models.Configuracion || model("Configuracion", configuracionSchema);
export default  ConfiguracionModel 
