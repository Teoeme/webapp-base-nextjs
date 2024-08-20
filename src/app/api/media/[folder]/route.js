import LocalStorageMediaRepository from '../localstoragemanager'
import path from "path"
import { v6 as uuid } from 'uuid'
import {nextResponseCreator} from '../../utils/responsecreator'

export async function POST(req,{params}) {
    try {
    const folder=params.folder
    const formdata = await req.formData()
    const images = formdata.getAll('images')
    const names = formdata.getAll('names')

    const files=[]
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const name = names?.[i];
        const buffer = await img.arrayBuffer(); // Convertir el archivo a ArrayBuffer
        const fileToAdd = Buffer.from(buffer)

        const mimeType = img.type; // Obtener el tipo MIME del archivo
        const extension = mimeType.split('/')[1]
        const type = mimeType.split('/')[0]

        const repo = new LocalStorageMediaRepository(`${process.cwd()}/public/uploads`)
        const filename=name || uuid()
        const file=await repo.addFileToFolder(path.join(folder, `${filename}.${extension}`), fileToAdd)
        if(file){
            files.push({
                asset_id:`${filename}`,
                url:path.join(folder, `${filename}.${extension}`),
                extension,
                resource_type:type,
                size:img?.size
            })
        }

    }

    return nextResponseCreator(200,'Archivos subidos con éxito',files)
} catch (error) {
    console.log('Error al cargar archivos',error)
    return nextResponseCreator(400,'Error al subir archivos')
}

}

export async function GET(req,{params}){
    try {
        const folder=params.folder
        const repo = new LocalStorageMediaRepository(`${process.cwd()}/public/uploads`)
        let files=await repo.getFilesFromFolder(folder)
        return nextResponseCreator(200,'Archivos obtenidos con éxito',files)
    } catch (error) {
        return nextResponseCreator(400,'Error al obtener archivos')
    }
}
export async function DELETE(req,{params}){
    try {
        const folder=params.folder
        const {files}=await req.json()
        const repo = new LocalStorageMediaRepository(`${process.cwd()}/public/uploads`)
        if(Array.isArray(files)){
            for (let idx = 0; idx < files.length; idx++) {
                const el = files[idx];
            await repo.deleteFileFromFolder(`${folder}/${el}`).catch(err=>console.log(err))
        }
        return nextResponseCreator(200,'Archivos eliminados con éxito')
        }else{
            await repo.deleteFileFromFolder(`${folder}/${files}`)
            return nextResponseCreator(200,'Archivo eliminado con éxito')
        }
    } catch (error) {
        console.log(error,'Error al elimnar archivo/s')
        return nextResponseCreator(400,error.cause.errno===-2 ? 'No se encuentra el/los archivo/s a eliminar' :'Error al eliminar archivo/s')
    }
}