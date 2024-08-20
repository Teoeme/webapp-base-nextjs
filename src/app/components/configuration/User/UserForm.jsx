import { FormControlLabel, Switch, TextField } from '@mui/material'
import React from 'react'
import RoleSelector from './RoleSelector'
import LoadingButton from '../../LoadingButton'
import ImageConfiguration from '../ImageConfiguration'

const UserForm = ({ data, setData,loading,handleSave,Mode,disableRoles,disableEmail }) => {
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(pv => ({ ...pv, [name]: value }))

    }
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex justify-center'>

            <ImageConfiguration value={data?.Image} onChange={handleChange} name={'Image'} imagesContainer={'rounded-full overflow-hidden'} imageClassName={'size-32 object-cover'}/>
            </div>
            <TextField name='Name' value={data?.Name} label="Nombre" onChange={handleChange} />
            {!disableEmail && <TextField name='Email' value={data?.Email} label="Email" onChange={handleChange} />}
           {!disableRoles && <RoleSelector value={data?.Role} onChange={handleChange} name='Role' />}
    {Mode==='Add' && <FormControlLabel 
        
            control={
                <Switch  value={data?.emailValidation} onChange={(e)=>setData(pv=>({...pv,emailValidation:e.target.checked}))} name='emailValidation'/>
            }

            label='Solicitar validación de email'
/>}
            {!data?.emailValidation && (Mode==='Edit' ? [<TextField name='oldPassword' value={data?.oldPassword} label="Contraseña actual" onChange={handleChange} />,
            <TextField name='newPassword' value={data?.newPassword} label="Nueva Contraseña" onChange={handleChange} />] :
             Mode==='Add' && 
            <TextField name='Password' value={data?.Password} onChange={handleChange} label='Contraseña'/>)
            }

            <div className=' flex justify-end'>
                <LoadingButton title={'Guardar'} loading={loading} onClick={handleSave}/>
            </div>
        </div>
    )
}

export default UserForm