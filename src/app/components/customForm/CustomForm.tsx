'use client'
import { TextField } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'
import LoadingButton from '../LoadingButton'
import SimpleSelect from '../simpleSelect/SimpleSelect'

export interface gridPosition {
  colStart?: number,
  colEnd?: number,
  rowStart?: number,
  rowEnd?: number
}

export interface selectOptions{
  value:any,
  label:string,
  icon?:any
}

export interface field {
  name: string,
  className?: string,
  label: string,
  value: object | string | number,
  onChange: (e: any) => any,
  type?: 'text' | 'number'| 'select' | 'date',
  component?: ReactElement,
  error?: boolean,
  helperText?: string,
  grid?: gridPosition,
  size?: 'small' | 'medium',
  multiline?: boolean,
  rows?: number,
  options?:selectOptions[],
  condition?:()=>boolean;

}

interface CustomFormTypes {
  fields: field[],
  loading?: boolean,
  onSubmit: Function,
  mode: 'Add' | 'Edit',
  className?: string
}




const CustomForm = ({ fields, loading, onSubmit, mode, className }: CustomFormTypes) => {

  return (
    <>
      <div className={`grid  gap-3 grid-cols-2 md:grid-cols-3 relative w-full ${className}`}>
        {fields?.map((el: field, idx: number) => {
          if(el?.condition && !el?.condition()) return
          if (el.component) {
            // return el.component
            return React.cloneElement(el.component as React.ReactElement, {
              key: `form-elem-${el.name}-${idx}`,
              label: el.label,
              value: el.value,
              onChange: el.onChange,
              className: el.className,
              grid:el.grid,
              size:el.size,
              name:el.name,
              error:el.error,
              helperText:el.helperText
            });
        
          } else if (el.type) {
            return <CustomField field={el} />
          }
        })}

      </div>
     {onSubmit && <div className='py-2 flex justify-end '>
        <LoadingButton
          loading={loading}
          onClick={onSubmit}
          title={mode === 'Add' ? 'Agregar' : 'Editar'}
          color={mode === 'Add' ? 'success' : 'warning'}
        />
      </div>}
    </>
  )
}

const CustomField = ({ field }: { field: field }) => {
  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <TextField
          value={field.value}
          onChange={field.onChange}
          name={field.name}
          label={field.label}
          className={field.className}
          size={field.size}
          type={field.type}
          multiline={field.multiline}
          rows={field.rows}
          style={{
            gridColumnStart: field.grid?.colStart,
            gridColumnEnd: field.grid?.colEnd,
            gridRowStart: field.grid?.rowStart,
            gridRowEnd: field.grid?.rowEnd,
          }}
        />
      )
      case 'date':
        return (
          <TextField
            value={field.value || ''}
            onChange={field.onChange}
            name={field.name}
            label={field.label}
            className={field.className}
            size={field.size}
            type={field.type}
            style={{
              gridColumnStart: field.grid?.colStart,
              gridColumnEnd: field.grid?.colEnd,
              gridRowStart: field.grid?.rowStart,
              gridRowEnd: field.grid?.rowEnd,
            }}
          />
        )
case 'select':
  return(<SimpleSelect 
  value={field.value}
  options={field.options}
  onChange={field.onChange}
  label={field?.label}
  name={field.name}
  className={field.className}
  />)
    default:
      break;
  }

}
export default CustomForm