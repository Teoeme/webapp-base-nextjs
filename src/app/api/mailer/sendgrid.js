import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    auth:{
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASSWORD
    }
})

export async function sendMail(mailTo,mail,subject){
    let res= await transporter.sendMail({
        from:`"ALTE" <contact@alteworkshop.com>`,
        to:mailTo,
        subject,
        html:mail
    })
}


export async function enviar_token_registro(mail, token){
  try{
    const body=`Para verificar tu email y completar tu registro en "${process.env.NEXT_PUBLIC_BUSSINES_NAME}", por favor visitá <a href="${process.env.NEXT_PUBLIC_BASE_URL}/signup/verificar/${token}?referrer=${mail}">este enlace</a>!`
    const r = await sendMail(mail,body,`Completar registro (${process.env.NEXT_PUBLIC_BUSSINES_NAME})`)
    return true
  }catch(error){
    console.error(`Error enviando email de registro a ${mail}`)
    return false
  }
}
export async function enviar_token_recuperacion(mail, token){
  try{
    const body=`Para recuperar tu cuenta en "${process.env.NEXT_PUBLIC_BUSSINES_NAME}", por favor visitá <a href="${process.env.NEXT_PUBLIC_BASE_URL}/user/recuperar/${token}?referrer=${mail}">este enlace</a>!`
    const r = await sendMail(mail,body,`Recuperar cuenta (${process.env.NEXT_PUBLIC_BUSSINES_NAME})`)
    return true
  }catch(error){
    console.error(`Error enviando email de recuperación a ${mail}`,error)
    return false
  }
}
