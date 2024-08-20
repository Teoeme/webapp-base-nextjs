import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

const StringConfiguration = ({value,onChange,label,...rest}:TextFieldProps) => {
  return (
    <TextField  value={value} onChange={onChange} label={label} {...rest} />
  )
}

export default StringConfiguration