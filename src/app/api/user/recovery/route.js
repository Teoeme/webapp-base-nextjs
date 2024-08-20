import TokenModel from '../../../models/token'
import { enviar_token_recuperacion } from '../../mailer/sendgrid'
import { TokenManager } from '../../token/token'
import {nextResponseCreator} from '../../utils/responsecreator'
export async function POST(req){
try {
    const body=await req.json()
    const tokenRepo=new TokenManager(TokenModel)
    const token= await tokenRepo.create({
        email:body.email,
        payload:body,
        token:await tokenRepo.generar_token(),
        instance:'recoverpassword',
        expiration:new Date(Date.now() + 1 * 60 * 60 * 1000)
    })
    console.log(token,'TOKEN')
    await enviar_token_recuperacion(body.email,token.token)
    
    return nextResponseCreator(200,'Solicitud de recuperación enviada al email')
} catch (error) {
    console.log(error.message,'Error al enviar solicitud')    
    return nextResponseCreator(400,'Error al enviar email de recuperación')
}
}