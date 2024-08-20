import { TokenManager } from '@/app/api/token/token'
import TokenModel from '@/app/models/token'
import { Button, TextField } from '@mui/material'
import React from 'react'
import { connectToMainDB } from '../../../../../api/utils/database'
import UserModel from '@/app/models/user'
import { hashPassword } from '@/app/api/auth/sessionUtils'
import { redirect} from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import Link from 'next/link'

const page = async ({ params, searchParams }) => {
  const token = params.token
  const email = searchParams?.["referrer"]
  const message = searchParams?.["message"]
  const success = searchParams?.["success"]
  const error = searchParams?.["error"]


  if(message && success){
    return <div className=' flex flex-col items-center gap-8 py-8'>
      <p className='  text-4xl w-full text-center'>{message}</p>
        <Link href={'/login'} className=' bg-primary text-primaryContent p-2 rounded uppercase'>Ingresar</Link>
      </div>
  }

  await connectToMainDB()
  const tokensRepo = new TokenManager(TokenModel)

  const verif = await tokensRepo.get_token(token)
  if (!verif) return (
    <p>Token inexistente!</p>
  )

  if (email != verif.email) return <p>El mail no coincide</p>


  const handleSubmit = async (formData) => {
    'use server'
    const currentUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/user/recuperar/${token}?referrer=${email}`);

    const Password = formData.get('Password')

    if (!Password) {
    currentUrl.searchParams.set('message', 'Introduzca una contraseña válida');
    currentUrl.searchParams.set('error', true);
    redirect(currentUrl.toString());
    }

    const hashedPass = await hashPassword(Password)

    const userDoc = await UserModel.findOne({Email:verif.email})

    if(userDoc.Password===hashedPass){
    currentUrl.searchParams.set('message', 'La contraseña debe ser diferente a las utilizadas antes.');
    currentUrl.searchParams.set('error', true);
    redirect(currentUrl.toString());
    }

    userDoc.Password=hashedPass
    await userDoc.save()
    await TokenModel.findOneAndDelete({token})
    
    currentUrl.searchParams.set('message', 'Su cuenta ha sido recuperada!');
    currentUrl.searchParams.set('success', 'true');
    redirect(currentUrl.toString());
  }

  return (
    <div className=' p-4 bg-background'>
      <p className=' text-4xl'>Bienvenid@ {verif?.payload?.Name}</p>
      <p>Creá una nueva contraseña para tu cuenta:</p>
      <form className='flex gap-2 flex-col w-[250px] py-2' action={handleSubmit}>
        <TextField label='Nueva Contraseña' type='password' name='Password' />
        {error && <p className=' text-xs text-error'>{message}</p>}
        <Button variant='contained' color='primary' type='submit'>Guardar</Button>
      </form>
    </div>
  )
}

export default page