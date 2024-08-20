import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import React from 'react'
import UserForm from './UserForm'
import { enqueueSnackbar } from 'notistack'
import useUser from '../../../hooks/useUser'
import useFileStorage from '../../../hooks/useFileStorage'

const UserModal = ({setForm,form,disableEmail,disableRoles}) => {

    const {updateUser,newUser,loading}=useUser()
    const {updateImages}=useFileStorage()
        const setData = (updater) => {
            setForm(prevForm => {
              const newData = typeof updater === 'function' ? updater(prevForm.data) : updater;
              return {
                ...prevForm,
                data: newData,
              };
            });
          };


          const handleSave=async()=>{
            const data={...form?.data}
            let resImage=data?.Image?.length>1 &&await updateImages(form?.data?.Image,'users').then(res=>res).catch(err=>console.log(err?.message))

            if(resImage){
              data['Image']=resImage
            }

            let res=form?.Mode==='Add' ? await newUser(data) : form?.Mode==='Edit' && await updateUser(data)
            enqueueSnackbar(res?.message,{variant:res?.ok ? 'success' : 'warning'})
            if(res?.ok){setForm({Open:false})}
          }


  return (
    <Dialog open={form?.Open} fullWidth maxWidth='xs' title={form?.Title}>
        <DialogActions className='flex justify-between'>
        {form?.Title}
        <IconButton size={'small'} onClick={()=>{setForm({Open:false})}}><Close fontSize='small'/></IconButton>
        </DialogActions>
        <DialogContent>
        <UserForm data={form.data} setData={setData} loading={loading} handleSave={handleSave} Mode={form?.Mode} disableEmail={disableEmail} disableRoles={disableRoles}/>

        </DialogContent>
    </Dialog>



  )
}

export default UserModal