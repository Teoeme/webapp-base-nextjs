'use client'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import LoadingButton from '../LoadingButton';
import useUser from '../../hooks/useUser';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [recoveryPass, setRecoveryPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {recoverPassword}=useUser()
  const router = useRouter()

  const handleChange = (e) => {
    const { value, name } = e.target
    setForm(pv => ({ ...pv, [name]: value }))
  }

  const handleSignIn = async () => {
    let res = await signIn('credentials', {
      redirect: false,
      email: form?.email,
      password: form?.password,
      callbackUrl: `${window.location.origin}/administration`
    })
    enqueueSnackbar(res?.error ? 'Credenciales incorrectas' : 'Sesion iniciada', { variant: res?.ok ? 'success' : 'warning' })
    if (res?.ok) {
      setTimeout(() => {
        router.refresh()
      }, 500);
    }
  }

  const handleRecovery = async () => {
    let res=await recoverPassword(form?.email)
    console.log(res,'RES RECOVER PASS')
  }

  return (
    !recoveryPass ?
      <div className=' w-full flex flex-col gap-3 h-52 '>
        <TextField
          name='email'
          type='email'
          onChange={handleChange}
          label="Email"
          value={form?.email}
        />
        <TextField
          name='password'
          onChange={handleChange}
          label="Contraseña"
          value={form?.password}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignIn()
            }
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(pv => !pv)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}

        />
        <Button size='small' className='w-max flex justify-start' color='primary' onClick={() => setRecoveryPass(true)}>Olvidé mi contraseña</Button>

        <div className=' w-full flex justify-center'>

          <LoadingButton
            color='primary'
            title={'Iniciar Sesión'}
            onClick={handleSignIn}

          />
        </div>
      </div> :
      <div className=' w-full flex flex-col gap-5 h-52 justify-center'>
      <TextField
      label="Email"
      placeholder='Email de recuperación'
      value={form?.email}
      onChange={handleChange}
      name='email'
      />
      <p className='text-sm text-copyLighter'>Se le enviarán instrucciones a su casilla de correo para recuperar su cuenta. Recuerde revisar la casilla de spam</p>
        <LoadingButton
        className='w-full text-sm py-2'
        
        color='primary'
        title={'Enviar'}
        onClick={handleRecovery}
      />
      </div>

  )
}

export default LoginForm