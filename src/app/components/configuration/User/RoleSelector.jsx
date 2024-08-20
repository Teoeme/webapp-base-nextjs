import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
const Roles=[
    {name:"SuperAdmin",value:"SUPERADMIN_ROLE"},
    {name:"Admin",value:"ADMIN_ROLE"},
    {name:"Usuario",value:"USER_ROLE"},

]
const RoleSelector = ({value,name,onChange}) => {

  return (
    <FormControl>
        <InputLabel id='rol-selector-label'>Rol</InputLabel>
        <Select value={value} name={name} onChange={onChange} labelId='rol-selector-label' label='Rol'>
            {Roles?.map((el,idx)=>{
                return(<MenuItem value={el.value}>{el.name}</MenuItem>)
            })}
        </Select>
    </FormControl>
)
}

export default RoleSelector