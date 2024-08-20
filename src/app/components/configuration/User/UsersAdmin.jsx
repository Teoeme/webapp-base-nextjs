'use client'

import React, { useState } from 'react'
import UserTable from './UserTable'
import UserModal from './UserModal'
import { IconButton } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import useUser from '../../../hooks/useUser'

const UsersAdmin = () => {

    const {usersList}=useUser()
    const [userModal, setUserModal] = useState({Open:false});
  
    return (
    <>
    <div className='w-full bg-background shadow-md rounded-lg mt-4 p-3 pb-6 '>
      <div className='flex justify-between lg:pr-2'>

     <p className=' p-2 uppercase'>Administrar Usuarios:</p>
     <IconButton onClick={(() => {
       setUserModal({ Mode: 'Add', Open: true, Title: "Agregar nuevo usuario", data: { Role: "USER_ROLE" } })
       })}><AddCircleOutline /></IconButton>
      </div>
   <UserTable usersList={usersList} setUserModal={setUserModal} />
    </div>
   <UserModal setForm={setUserModal} form={userModal} />
    </>
  )
}

export default UsersAdmin