'use client'

import Image from 'next/image'
import './Navbar.css'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import useConfigurations from '../../hooks/useConfigurations'
import ColorModeSwitch from './ColorModeSwitch'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const UserNavbar = ({basicLinks}) => {
    const router=useRouter()

    const [src, setSrc] = useState('');
    const colorMode = Cookies.get('color-mode') || 'light'

    const pathname=usePathname()
    const { getConfigByName } = useConfigurations()
    const logoimage = async () => {
        let res = await getConfigByName(colorMode === 'light' ? 'logoimage' : 'logoimagedark').then(res => res?.data?.value[0])
        setSrc(res?.url)
    }

    useEffect(() => {
        logoimage()
    }, [colorMode]);

    return (
        <>
            <nav className=' w-screen bg-background h-[6vh] min-h-[60px] flex justify-between px-2'>
                <div className='h-full flex items-center justify-between  flex-1'>
                    <Image src={`/uploads/${src}`} width={300} height={300} className=' w-auto h-auto max-h-full max-w-[15vw] p-2 cursor-pointer' onClick={()=>router.push('/')} />
                    <div className=' flex gap-6 px-4'>
                        {basicLinks?.map((el,idx)=>{
                            const isSelected=pathname===el.href

                            if(el.onlySA && !isSA) return
                            return(<Link key={el.href} href={el.href}
                            className={`${isSelected && ' navbar-link-selected '} uppercase text-xs font-light navbar-link`}
                            >{el.label}</Link>)
                        })}
                    </div>
                </div>
                <div className=' p-2 flex items-center gap-2'>
                <ColorModeSwitch />
                </div>
            </nav>
        </>
    )
}

export default UserNavbar