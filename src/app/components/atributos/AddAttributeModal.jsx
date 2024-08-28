import { AddCircleOutline, Close } from '@mui/icons-material'
import {  FormControl, IconButton, OutlinedInput, TextField } from '@mui/material'
import LoadingButton from '../LoadingButton'
import DialogModal from '../dialogmodal/DialogModal'
import useModal from '@/app/hooks/useModal'
import { useAttribute } from '@/app/hooks/useAttribute'
import ImageConfiguration from '../configuration/ImageConfiguration'
import useFileStorage from '@/app/hooks/useFileStorage'

const AddAttrinuteModal = () => {
const {data,setData,handleChange,close}=useModal('AddAttributeModal')

const {addAttribute,loading,editAttribute}=useAttribute()
const {updateImages}=useFileStorage()

const handleAdd=async()=>{
    const newIcon=await updateImages(data?.Icon,'Icons')
    let res=data?.Mode==='Add' ? await addAttribute(newIcon ? {...data,Icon:newIcon} : data) : await editAttribute(newIcon ? {...data,Icon:newIcon} : data)
    if(res?.ok){
        close(true)
    }
}

const addOption=()=>{
    let newOptions=[]
    if(data?.Options?.length>0){
        newOptions=[...data?.Options]
    }
    newOptions.push('')
    setData(pv=>({...pv,Options:newOptions}))
}


  return (
<DialogModal modalName='AddAttributeModal' setOpen={setData} title='Agregar nuevo atributo'>
<div className=' flex p-2 flex-col gap-3'>
    <div className=' flex w-full justify-center'>
    <ImageConfiguration multiple={false} value={data?.Icon} name='Icon' onChange={handleChange} label='Icono' imagesContainer=' h-24 w-24 rounded '  />
    </div>

    <TextField
    value={data?.Name}
    onChange={handleChange}
    label='Nombre'
    name='Name'
    />

    <div className='flex flex-col gap-3 px-1 h-4/5 overflow-auto'>
        <span className=' w-full flex justify-between items-center'>
        <p>Valores posibles</p>
        <IconButton size='small' onClick={addOption} color='primary'><AddCircleOutline  /></IconButton>
        </span>
        {data?.Options?.map((el,idx)=>{

const removeItem=()=>{
    let newOptions=data?.Options?.filter(e=>e!==el)
    setData(pv=>({...pv,Options:newOptions}))
}
const handleOption=(e)=>{
    let newOptions=[...data?.Options]
    newOptions[idx]=e.target.value
    setData(pv=>({...pv,Options:newOptions}))
}

            return (<FormControl size='small'>
                
                <OutlinedInput value={el}
                onChange={handleOption}
                endAdornment={<IconButton size='small' onClick={removeItem}><Close fontSize='small' /></IconButton>}
                />
                 </FormControl>
                )
        })}
    </div>

<div className='flex w-full justify-end'>
    <LoadingButton color='success' variant='outlined' title={"Agregar"} onClick={handleAdd} loading={loading}  />
</div>
</div>

</DialogModal>
)
}

export default AddAttrinuteModal