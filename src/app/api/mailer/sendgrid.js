import nodemailer from 'nodemailer'



const transporter=nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    auth:{
        user:'7966aa001@smtp-brevo.com',
        pass:'csJKMO2d86g3QqjP'
    }
})

export async function sendMail(mailTo,mail,subject){
    let res= await transporter.sendMail({
        from:'"ALTE" <contact@alteworkshop.com>',
        to:mailTo,
        subject,
        html:mail
    })
}


export async function enviar_token_registro(mail, token){
  console.log(`Enviando mail a ${mail}`)
  try{
    const body=`Para verificar tu email y completar tu registro, por favor visitá <a href="${process.env.NEXT_PUBLIC_BASE_URL}/signup/verificar/${token}?referrer=${mail}">este enlace</a>!`
    const r = await sendMail(mail,body,'Completar registro')
    console.log(`Email de registro enviado a ${mail}`)
    console.log(r)
    return true
  }catch(error){
    console.error(`Error enviando email de registro a ${mail}`)
    return false
  }
}
export async function enviar_token_recuperacion(mail, token){
  console.log(`Enviando mail de recuperación a ${mail}`)
  try{
    const body=`Para recuperar tu cuenta, por favor visitá <a href="${process.env.NEXT_PUBLIC_BASE_URL}/user/recuperar/${token}?referrer=${mail}">este enlace</a>!`
    const r = await sendMail(mail,body,'Recuperar cuenta')
    console.log(`Email de recuperación enviado a ${mail}`)
    console.log(r)
    return true
  }catch(error){
    console.error(`Error enviando email de recuperación a ${mail}`)
    return false
  }
}
