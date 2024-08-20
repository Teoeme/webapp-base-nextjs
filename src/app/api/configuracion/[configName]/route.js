import { connectToMainDB } from "../../utils/database"
import { checkUserRole } from "../../auth/sessionUtils"
import { nextResponseCreator } from "../../utils/responsecreator"
import ConfiguracionModel from "../../../models/configuracion"

export async function GET(req,{params}){

    try {
        await connectToMainDB()
        const configName = params.configName
        let res=await ConfiguracionModel.findOne({name:configName})
        
        if(res?.protected && !await checkUserRole(["ADMIN_ROLE","SUPERADMIN_ROLE"])){
            return nextResponseCreator(403,'Permisos insuficientes')
            }
        

        return nextResponseCreator(200,'Configuracion obtenida',res)

    } catch (error) {
        console.log(error)
        return nextResponseCreator(400,'Error al obtener config')
    }
}