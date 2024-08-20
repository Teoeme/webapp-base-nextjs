import mongoose from "mongoose";
import { configurations, users } from "./initialconfigs";
import ConfiguracionModel from "../../models/configuracion";
import UserModel from "../../models/user";

let mainDBConnection; // Variable global para almacenar la conexión
let dbInitialzated=false

export const connectToMainDB = async () => {
  mongoose.set('strictQuery', true);
  if (mainDBConnection) {
    return mainDBConnection; // Devuelve la conexión existente
  }

  try {
    mainDBConnection = await mongoose.connect(process.env.MONGODB_URI,{
      dbName:process.env.MONGODB_DATABASE
    });
    initializeConfigurations()
    return mainDBConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}





async function initializeConfigurations(){
  if(dbInitialzated) return

  try {
for (let idx = 0; idx < configurations.length; idx++) {
  const config = configurations[idx];
  
  if(!await ConfiguracionModel.exists({name:config.name})){
    let newConfig=new ConfiguracionModel(config)
    await newConfig.save()
  }
}

for (let idx = 0; idx < users.length; idx++) {
  const usr = users[idx];
  if(!await UserModel.exists({Email:usr.Email})){
    let newUser=new UserModel(usr)
    await newUser.save()
  }
}

dbInitialzated=true
console.log("✅  ----------------- ¡Configuracion inicializada! -----------------  ✅")
} catch (error) {
      console.log(error,'Error al inicializar la configuración')
  }
}