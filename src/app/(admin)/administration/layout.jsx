import React from 'react'
import {checkUserRole} from '../../api/auth/sessionUtils'
import { redirect } from 'next/navigation'
import AdminNavBar from '../../components/Navbars/AdminNavbar'
const layout = async ({children}) => {
    let authorized=await checkUserRole(['SUPERADMIN_ROLE','ADMIN_ROLE'])
    if(!authorized){
        redirect('/login')
    }
    
  return (
    <>
    <AdminNavBar />
    {children}
    </>
  )
}

export default layout