'use client'
import { TextField } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'

interface gridPosition {
  colStart?:number,
  colEnd?:number,
  rowStart?:number,
  rowEnd?:number
}

export interface field {
  name:string,
  className?:string,
  label:string,
  value:object | string,
  onChange:(e:any)=>any,
  type?:string,
  component?:ReactElement,
  error?:boolean,
  helperText?:string,
  grid?:gridPosition,
  size?:'small' | 'medium',
  multiline?:boolean,
  rows?:number

}

interface CustomFormTypes {
  fields:field[],
  loading?:boolean,
  onSubmit:Function,
  mode:'Add' | 'Edit',
  className?:string
}




const CustomForm = ({fields,loading,onSubmit,mode,className}:CustomFormTypes) => {

  return (
    <div className={`grid gap-2 grid-cols-3 ${className}`}>
      {fields?.map((el:field,idx:number)=>{
        if(el.component){
          return el.component
        }else if(el.type){
          return <CustomField field={el} />
        }
      })}

    </div>
  )
}

const CustomField=({field}:{field:field})=>{
  switch (field.type) {
    case 'text':
    case 'number':
      return(
        <TextField 
        value={field.value}
        fullWidth
        onChange={field.onChange}
        name={field.name}
        label={field.label}
        className={field.className}
        size={field.size}
        type={field.type}
        multiline={field.multiline}
        rows={field.rows}
        style={{
          gridColumnStart:field.grid?.colStart,
          gridColumnEnd:field.grid?.colEnd,
          gridRowStart:field.grid?.rowStart,
          gridRowEnd:field.grid?.rowEnd,
        }}
        />
      )
      
      break;
  
    default:
      break;
  }

}
export default CustomForm