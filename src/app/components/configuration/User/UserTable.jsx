import React from 'react'
import { AddCircleOutline, Delete, EditOutlined } from '@mui/icons-material'
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { enqueueSnackbar } from 'notistack'
import useUser from '../../../hooks/useUser'
const UserTable = ({ usersList, setUserModal }) => {

    const confirm = useConfirm()
    const { deleteUser } = useUser()

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


if(!fullScreen){

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usersList?.map((usr, idx) => {
                    const handleEdit = () => {
                        setUserModal(pv => ({ ...pv, data: usr, Open: true, Title: 'Editar Usuario', Mode: "Edit" }))
                    }

                    const handleDelete = async () => {
                        confirm({ description: `¿Desea eliminar el usuario ${usr.Name}? Esta acción es irreversible`, confirmationText: "Eliminar definitivamente", cancellationTextL: "Cancelar" }).then(async () => {
                            let res = await deleteUser(usr._id)
                            enqueueSnackbar(res?.message, { variant: res?.ok ? 'success' : 'warning' })
                        })
                    }

                    return (
                        <TableRow key={`${usr.Email}-data`}>
                            <TableCell>{usr?.Name}</TableCell>
                            <TableCell>{usr?.Email}</TableCell>
                            <TableCell>{usr?.Role}</TableCell>
                            <TableCell>
                                <IconButton size='small' onClick={handleEdit}><EditOutlined fontSize='small' /></IconButton>
                                <IconButton size='small' color='error' onClick={handleDelete}><Delete fontSize='small' /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>)
}else{
    return( <div className=' p-2 shadow-md rounded-md bg-zinc-100'>
    
{usersList?.map((usr, idx) => {
                    const handleEdit = () => {
                        setUserModal(pv => ({ ...pv, data: usr, Open: true, Title: 'Editar Usuario', Mode: "Edit" }))
                    }

                    const handleDelete = async () => {
                        confirm({ description: `¿Desea eliminar el usuario ${usr.Name}? Esta acción es irreversible`,title:'Eliminar usuario', confirmationText: "Eliminar definitivamente", confirmationButtonProps:{color:'error'}, cancellationText: "Cancelar" }).then(async () => {
                            let res = await deleteUser(usr._id)
                            enqueueSnackbar(res?.message, { variant: res?.ok ? 'success' : 'warning' })
                        })
                    }

                    return (
                        <div>
                            <span className='flex gap-2 items-baseline font-extralight'>
                                <p className=' text-xs w-12'>Nombre:</p>
                                <p className=' font-normal flex-1'>{usr?.Name}</p>
                                <div>
                                <IconButton size='small' onClick={handleEdit}><EditOutlined fontSize='small' /></IconButton>
                                <IconButton size='small' color='error' onClick={handleDelete}><Delete fontSize='small' /></IconButton>
                            </div>
                            </span>
                            <span className='flex gap-2 items-baseline font-extralight'>
                                <p className=' text-xs w-12'>Email:</p>
                                <p className=' font-normal text-sm'>{usr?.Email}</p>
                            </span>
                            <span className='flex gap-2 items-baseline font-extralight'>
                                <p className=' text-xs w-12'>Rol:</p>
                                <p className=' font-normal text-sm'>{usr?.Role}</p>
                            </span>
                           
                            <div></div>
                        </div>
                    )
                })}
</div>
)
}

}


export default UserTable