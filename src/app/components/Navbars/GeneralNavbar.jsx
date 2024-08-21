import React from 'react'
import {checkSession} from '../../api/auth/sessionUtils'
import AdminNavbar from './AdminNavbar'
import UserNavBar from './UserNavBar'
import { basicLinks } from '@/app/configuraciones'

const GeneralNavbar = async() => {
    const isAuth=await checkSession ()

  return (
    <>
{isAuth ? <AdminNavbar basicLinks={basicLinks} /> : <UserNavBar basicLinks={basicLinks}/>}
    </>
)
}

export default GeneralNavbar