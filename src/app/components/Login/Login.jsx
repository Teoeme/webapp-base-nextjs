'use client'
import React, { Suspense, useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import useConfigurations from '@/app/hooks/useConfigurations'
import Image from 'next/image'
import {  Skeleton } from '@mui/material'
import Cookie from 'js-cookie'
const Login = () => {
  const [src, setSrc] = useState('');
  const colorMode=Cookie.get('color-mode') || 'light'
const {getConfigByName}=useConfigurations()
const logoimage=async()=>{let res= await getConfigByName(colorMode==='light'?'logoimage':'logoimagedark').then(res=>res?.data?.value[0])
  setSrc(res?.url)
  
}
useEffect(() => {
  logoimage()
}, []);



return (
  <div className=' bg-foreground w-full h-screen flex flex-col items-center pt-[8vh] gap-6'>
        {src ?
         <div className=' size-[350px]  flex items-end'>
         <Image  width={350} height={350} src={`/uploads/${src}`} className={'object-cover w-full h-auto max-h-full bg-red rounded'}  /> 
         </div>
         : <Skeleton width={350} height={350} variant='rectangular' className='rounded-xl' />}
        <div className=' bg-background w-[350px] h-min rounded-xl shadow-lg p-6'>
        <LoginForm />        
        </div>
    </div>
  )
}



export default Login

