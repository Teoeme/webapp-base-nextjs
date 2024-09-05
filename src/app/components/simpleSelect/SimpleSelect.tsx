import React from 'react'
import { selectOptions } from '../customForm/CustomForm'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SimpleSelectComponent{
    options:selectOptions[];
    value:any,
    onChange:Function,
    label?:string,
    name:string,
    className?:string

}

const SimpleSelect = ({options,value,onChange,label,name,className}:SimpleSelectComponent) => {

  return (
<FormControl className={className} >
  <InputLabel id={`selector-${name}`}>{label}</InputLabel>
  <Select
    labelId={`selector-${name}`}
    id={`simple-select-${name}`}
    value={value}
    label={label}
    onChange={(e)=>{onChange({target:{name,value:e.target.value}})}}

>
    {options?.map((opt:selectOptions,idx:number)=><MenuItem key={`${opt.label}-${idx}-option`} value={opt.value}>{opt.label}</MenuItem>)}
  </Select>
</FormControl>
  )
}

export default SimpleSelect