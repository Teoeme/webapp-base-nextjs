'use client'
import React from 'react'
import LoadingButton from '../LoadingButton'
import { TextField } from '@mui/material'

const SignupForm = ({handleSubmit}) => {

  return (
<div className='flex gap-2 flex-col w-[250px]'>

<TextField label='Nombre'  />
<TextField label='Contraseña'  />
<LoadingButton title={'Completar Registro'} onClick={handleSubmit}/>
</div>  )
}

export default SignupForm