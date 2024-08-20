'use client'
import { LogoutOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Menu, MenuItem, Skeleton } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const CurrentUser = ({setUserModal}) => {
  const { data } = useSession()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <div className='h-full bg-primary/20  flex gap-2 items-center p-2 rounded-md'>
      <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            >
           {data?.user?.Image?.[0]?.url ?<Avatar src={`/uploads/${data.user.Image?.[0].url}`}/> :  <Avatar>{data?.user.Name[0]}</Avatar>}
          </IconButton>
      <div className=' text-xs text-primary w-[160px]'>
        {data?.user ? 
        <>
        <p>{data?.user?.Name}</p>
        <p>{data?.user?.Email}</p>
        </> 
        : <Skeleton width={160} height={35} variant='rectangular' />}
      </div>
        <IconButton onClick={signOut} color='primary'>
          <LogoutOutlined />
        </IconButton>
    </div>
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=>setUserModal({Open:true,Mode:'Edit',data:data?.user,Title:"Editar perfil"})}>Editar perfil</MenuItem>

      </Menu>
        </>
  )
}

export default CurrentUser