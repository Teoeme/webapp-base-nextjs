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


  if(message){
    return <div className=' flex flex-col items-center gap-8 py-8'>
      <p className='  text-4xl w-full text-center'>{message}</p>
        <Link href={'/login'} className=' bg-primary text-primaryContent p-2 rounded uppercase'>Iniciar Sesión</Link>
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
    const Name = formData.get('Name')
    const Password = formData.get('Password')

    if (!Name || !Password) {
      return
    }
    const hashedPass = await hashPassword(Password)
    const user = new UserModel({ ...verif.payload, Name, Password: hashedPass })
    await user.save()
    await TokenModel.findOneAndDelete({token})
    
    const currentUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/verificar/token`);
    currentUrl.searchParams.set('message', 'Se registró con éxito!');
    redirect(currentUrl.toString());
  }


  return (
    <div className=' p-4 bg-background'>
      <p className=' text-4xl'>Bienvenid@ {verif?.payload?.Name}</p>
      <p>Completa tus datos para crear tu usuario:</p>
      <form className='flex gap-2 flex-col w-[250px] py-2' action={handleSubmit}>
        <TextField label='Nombre' type='text' name='Name' />
        <TextField label='Contraseña' type='password' name='Password' />
        <Button variant='contained' color='primary' type='submit'>Guardar</Button>
      </form>
    </div>
  )
}

export default page