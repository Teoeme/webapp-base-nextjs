import UserModel from "../../models/user";
import { checkUserRole, comparePasswords, getUser, hashPassword } from "../auth/sessionUtils";
import { connectToMainDB } from "../utils/database";
import { nextResponseCreator } from "../utils/responsecreator";
import {TokenManager} from '../token/token'
import TokenModel from "../../models/token";
import { enviar_token_registro } from "../mailer/sendgrid";

export async function POST(req) {
    try {
        if (!await checkUserRole(["SUPERADMIN_ROLE"])) {
            return nextResponseCreator(403, 'Permisos insuficientes')
        }
        await connectToMainDB()
        
        let body = await req.json()
        const emailValidation=body?.emailValidation
        

        if(!body.Password && !emailValidation){
            throw new Error("Debe especificar el password")
        }

        if(!emailValidation){
            let Password = await hashPassword(body?.Password)
            let newUser = await new UserModel({ ...body, Password })
            await newUser.save()
            return nextResponseCreator(200, 'Usuario creado')
        }else{
            //crear usuario desde validacion de email
            try {
                
            const tokenRepo=new TokenManager(TokenModel)
            const token= await tokenRepo.create({
                email:body.Email,
                payload:body,
                token:await tokenRepo.generar_token(),
                instance:'signup',
                expiration:new Date(Date.now() + 48 * 60 * 60 * 1000)
            })
            console.log(token,'TOKEN')
            await enviar_token_registro(body.Email,token.token)
            
            return nextResponseCreator(200, 'Invitación de usuario enviada por mail')
            
                    } catch (error) {
                            throw new Error(error.message)
                    }
        }

    } catch (error) {
        console.log(error)
        return nextResponseCreator(400, `Error al crear usuario: ${error.message}`)

    }
}

export async function PUT(req) {
    try {
        let body = await req.json()
        const currentUser=await getUser()
        const editingMyself=currentUser?._id.equals(body?._id)
        const isSuperAdmin=await checkUserRole(['SUPERADMIN_ROLE'])

        if (!isSuperAdmin && !editingMyself) {
            return nextResponseCreator(403, 'Permisos insuficientes')
        }

        await connectToMainDB()
        let userToEdit=await UserModel.findById(body._id)
        if(!userToEdit) return nextResponseCreator(400,'No se encontró el usuario')

        if(!isSuperAdmin && userToEdit.Role==='SUPERADMIN_ROLE'){
            body.Role=userToEdit.Role //Evitar que el admin cambie los roles del superadmin
        }    

        if(!isSuperAdmin && body?.Role==='SUPERADMIN_ROLE'){
            body.Role=userToEdit.Role   //evitar que se escale a superadmin
        }

        if(!isSuperAdmin){
            body.Email=userToEdit.Email //No se puede cambiar el Email por seguridad
        }

        body.Password=userToEdit.Password 
        if(body.newPassword){
           body.Password= await handleEditPassword(userToEdit,body.oldPassword,body.newPassword)
        }
        Object.assign(userToEdit,body)
        await userToEdit.save()
        return nextResponseCreator(200, 'Usuario editado')
    } catch (error) {
        console.log(error)
        return nextResponseCreator(400, `Error al editar usuario: ${error?.message}`)

    }
}

async function handleEditPassword(userToEdit,oldPassword,newPassword){
    console.log(oldPassword,newPassword,'NEWS')
    if(!oldPassword || !newPassword){
        throw new Error('No se especificó el cambio de contraseña')
    }
    const currentUser=await getUser()
    if(!userToEdit._id.equals(currentUser._id) ){
        if(!await checkUserRole(['SUPERADMIN_ROLE'])){
            throw new Error('Imposible cambiar la contraseña de otro usuario.')
        }
    }

    const verifyOldPassword= await comparePasswords(oldPassword,userToEdit.Password)
    if(!verifyOldPassword && !await checkUserRole(['SUPERADMIN_ROLE'])) throw new Error('La contraseña actual no es correcta.')

    let newHashedPassword = await hashPassword(newPassword)

    return newHashedPassword

}

export async function GET() {

    try {
        if (!await checkUserRole(["ADMIN_ROLE", "SUPERADMIN_ROLE"])) {
            return nextResponseCreator(403, 'Permisos insuficientes')
        }
        await connectToMainDB()
        const users = await UserModel.find().select("-Password")
        return nextResponseCreator(200, 'Usuarios obtenidos', users)
    } catch (error) {
        console.log(error)
        return nextResponseCreator(400, 'Error al obtener usuarios')

    }
}

export async function DELETE(req){
    try {
        if (!await checkUserRole(["SUPERADMIN_ROLE"])) {
            return nextResponseCreator(403, 'Permisos insuficientes')
        }
        await connectToMainDB()
        const body=await req.json()
        const userToDelete=await UserModel.findById(body.id)

        if(userToDelete.Role==='SUPERADMIN_ROLE'){
            return nextResponseCreator(403, 'Permisos insuficientes') //Evitar la eliminacion del superadmin
        }    
        await userToDelete.deleteOne()

        return nextResponseCreator(200, 'Usuario eliminado con éxito.')
    } catch (error) {
        console.log(error)
        return nextResponseCreator(400, 'Error al eliminar usuario')
        
    }
}

