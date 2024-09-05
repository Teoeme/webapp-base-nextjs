'use client'

import React, { useState } from 'react'
import GenericAutocomplete, { OptionType } from '../genericAutocomplete'
import { selectOptions } from '../customForm/CustomForm'
import SimpleSelect from '../simpleSelect/SimpleSelect'
import { TextField } from '@mui/material'

export interface FilterField{
    type:"select" | 'autocomplete' | 'text' | 'range',
    combinable:boolean,
    queryParamName:string,
    options?: OptionType[] | selectOptions[],
    label:string,
    className?:string

}

const FilterProducts = ({fields,className}) => {
  const [form, setForm] = useState({});
  
  const handleChange=(e)=>{
    const {name,value}=e.target
    setForm(pv=>({...pv,[name]:value}))
  }

    return (
    <div className={className}>
    {fields?.map((el,idx)=>{

        return <FilterFiled type={el.type} 
        value={form?.[el.queryParamName]}
        options={el?.options || []}
        label={el.label}
        onChange={handleChange}
        queryParamName={el.queryParamName}
        className={el?.className}
        />
        
    })}
    </div>
  )
}

const FilterFiled = ({type,value,onChange,queryParamName,options,label,className})=>{
    switch (type) {
        case 'select':
            return <SimpleSelect 
            value={value}
            onChange={onChange}
            options={options}
            name={queryParamName}
            className={className}
            label={label}
        
            />
    
        case 'autocomplete':
            return <GenericAutocomplete
            value={value}
            onChange={onChange}
            options={options}
            name={queryParamName}
            multiple={false}
            className={className}
            label={label}
          
            


            />
        case 'text':
            return <TextField
            value={value}
            onChange={onChange}
            name={queryParamName}
            label={label}
            className={className}
            placeholder={label}

            />
        
            break;
    
        default:
            break;
    }
}

export default FilterProducts