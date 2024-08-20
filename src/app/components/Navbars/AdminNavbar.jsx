'use client'

import Image from 'next/image'
import './Navbar.css'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import useConfigurations from '../../hooks/useConfigurations'
import CurrentUser from './CurrentUser'
import ColorModeSwitch from './ColorModeSwitch'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserModal from '../configuration/User/UserModal'

const AdminNavbar = () => {
    const [userModal, setUserModal] = useState({Open:false,Mode:"Edit",Title:'Editar usuario'});
    const {data}=useSession()
    const isSA=data?.user?.Role ==='SUPERADMIN_ROLE'

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

    const links=[
        {
            label:"Administración",
            href:"/administration",
            onlySA:false,
        },
        {
            label:"Configuración",
            href:"/administration/configuration",
            onlySA:true,
        },
    ]

    return (
        <>
            <nav className=' w-screen bg-background h-[6vh] min-h-[60px] flex justify-between'>
                <div className='h-full flex items-center justify-between  flex-1'>
                    <Image src={`/uploads/${src}`} width={300} height={300} className=' w-auto h-auto max-h-full max-w-[15vw] p-2' />
                    <div className=' flex gap-6 px-4'>
                        {links?.map((el,idx)=>{
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
                    <CurrentUser setUserModal={setUserModal}/>
                </div>
            </nav>
            <UserModal form={userModal} setForm={setUserModal} disableEmail={true} disableRoles={true}/>
        </>
    )
}

export default AdminNavbar