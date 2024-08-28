'use client'
import { useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

const useCustomMediaQuery = () => {
    const [currentDevice, setCurrentDevice] = useState('desktop');
  const theme=useTheme()

  const mobile=useMediaQuery(theme.breakpoints.down('md'))
  const tablet=useMediaQuery(theme.breakpoints.between('md','lg'))
  const desktop=useMediaQuery(theme.breakpoints.up('lg'))
  
    
    const getCurrentDevice=()=>{
      return mobile ? 'mobile' : tablet ? 'tablet' : desktop ? 'desktop' : 'mobile'
    }

    useEffect(() => {
        console.log(getCurrentDevice())
    }, []);

    return {currentDevice}
}

export default useCustomMediaQuery