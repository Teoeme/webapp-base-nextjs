import React from 'react'
import {checkSession} from '../../api/auth/sessionUtils'
import AdminNavbar from './AdminNavbar'
import UserNavBar from './UserNavBar'

const GeneralNavbar = async() => {
    const isAuth=await checkSession ()

    const basicLinks=[
        {
            label:"Home",
            href:"/",
        }
    ]


  return (
    <>
{isAuth ? <AdminNavbar basicLinks={basicLinks} /> : <UserNavBar basicLinks={basicLinks}/>}
    </>
)
}

export default GeneralNavbar