import ConfiguracionModel from "@/app/models/configuracion";
import { connectToMainDB } from "../utils/database";
import { nextResponseCreator } from "../utils/responsecreator";
import { checkUserRole } from "../auth/sessionUtils";
import { revalidateTag } from "next/cache";

export async function GET(){
    try {
        if(!await checkUserRole(["ADMIN_ROLE","SUPERADMIN_ROLE"])){
            return nextResponseCreator(403,'Permisos insuficientes')
        }        
        await connectToMainDB()
        let docs=await ConfiguracionModel.find()
        return nextResponseCreator(200,'Configuraciones obtenidas',docs)
    } catch (error) {
        console.log(error)
        return nextResponseCreator(200,'Error al obtener configuraciones')
    }
}

export async function PUT(req){
    try {
        if(!await checkUserRole(["ADMIN_ROLE","SUPERADMIN_ROLE"])){
            return nextResponseCreator(403,'Permisos insuficientes')
        }
        await connectToMainDB()
        const body=await req.json()
        let doc={}
        if(body?._id){
            doc=await ConfiguracionModel.findByIdAndUpdate(body?._id,body,{returnDocument:'after'})
        }else if(body?.name){
            doc=await ConfiguracionModel.findOneAndUpdate({name:body.name},body,{returnDocument:'after'})
        }else{
            throw new Error("Debe especificar id o name de la configuración")
        }
        if(doc?.name==='palette'){
            console.log('Revalidando paleta')
            revalidateTag('palette')
        }

        return nextResponseCreator(200,`Configuracion (${body.name}) editada con exito`,doc)
    } catch (error) {
        console.log(error)
        return nextResponseCreator(400,`Error al editar configuraciones: ${error?.message}`)
    }
}

export async function POST(req){
    try {
        if(!await checkUserRole(["ADMIN_ROLE","SUPERADMIN_ROLE"])){
            return nextResponseCreator(403,'Permisos insuficientes')
        }
        await connectToMainDB()
        const body=await req.json()
        let doc=new ConfiguracionModel(body)
        await doc.save()
        return nextResponseCreator(200,'Configuracion agregada con exito',doc)
    } catch (error) {
        console.log(error)
        return nextResponseCreator(200,'Error al agregar configuraciones')
    }
}