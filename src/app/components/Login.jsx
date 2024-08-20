'use client'
import { TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
    const [form, setForm] = useState({});
    const router = useRouter()
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e) => {
        if (form?.Email && form?.Password) {
            setForm(prev => ({ ...prev, loading: true }))
            let res = await signIn('credentials', {
                redirect: false,
                email: form?.Email,
                password: form?.Password,
                callbackUrl: `${window.location.origin}/admin`
            })
            if (!res.ok) {
                setForm(prev => ({ ...prev, error: 'Datos incorrectos', loading: false }))
            } else {
                setForm(prev => ({ ...prev, error: 'Login correcto', loading: false }))
                // router.push(res.url);
                setTimeout(() => {
                    router.refresh()
                }, 500);


            }

        }
    }

    return (
        <div className='w-full h-full '>
            <div className=' bg-background shadow-md rounded-sm px-2 py-6 flex flex-col items-center h-full'>
                <Image src={'/images/logonegro.png'} width={700} height={700}  quality={100} className='w-[65px]'
                    alt={`Logo de ${process.env.NEXT_PUBLIC_BUSSINES_NAME}`} />

                <form className='flex flex-col justify-center items-center w-full h-full gap-9' >
                    <div className='flex flex-col justify-center items-center gap-3 w-full mt-3'>
                        <label className='uppercase' />E-mail:
                        <TextField type='text' className='bg-transparent border-b-[.5px] border-grisoscuro p-1 lg:w-[65%] w-3/4 focus:outline-none' onChange={handleChange} name='Email' value={form?.Email} />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-3 w-full'>
                        <label />Contraseña:
                        <TextField type='password' className='bg-transparent border-b-[.5px] border-grisoscuro p-1 lg:w-[65%] w-3/4 focus:outline-none' name='Password' onChange={handleChange} value={form?.Password} onKeyDown={(e)=>{if(e.key==='Enter') {handleSubmit()}}} />
                    </div>
                    {form?.error && <p className=' text-[12px] text-red-700/50 absolute bottom-32 '>{form.error}</p>}

                    <button className='text-grisoscuro uppercase tracking-[.08em] border rounded-sm font-coro font-semibold border-grisoscuro py-3 px-6 hover:scale-105 hover:duration-300 ' type='button' onClick={handleSubmit}>Ingresar</button>
                </form>
            </div>
        </div>)
}

export default Login