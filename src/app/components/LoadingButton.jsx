import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingButton = ({onClick,type='button',color='success',variant='outlined' ,className=' md:h-fit w-full md:w-fit',loading,title}) => {
  return (
     <Button type={type} color={color} variant={variant}
     disabled={loading}
    className={className} onClick={onClick}>{loading ? <CircularProgress className=' text-inherit' size={22}/>:title}
    
    </Button>
  )
}

export default LoadingButton