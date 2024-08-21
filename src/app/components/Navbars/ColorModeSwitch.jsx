'use client'
import React, { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4Outlined, Brightness5Outlined, Close } from '@mui/icons-material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import useColorMode from '../../hooks/useColorMode'

const ColorModeSwitch = () => {
    const { setColorMode,colorMode,isAutoMode } = useColorMode()
    const [selector, setSelector] = useState(colorMode);
    
    useEffect(() => {
        const current=(isAutoMode ? 'auto' : colorMode)
        setSelector(current)
    }, [colorMode,isAutoMode]);

    const modeTree = {
        light: 'dark',
        dark: 'auto',
        auto:'light'
    }

    const TooltipTree={
        dark:'Modo oscuro',
        light:'Modo claro',
    }

    const handleChangeColorMode = () => {
        setColorMode(modeTree[selector])
    }

    return (
        <Tooltip title={isAutoMode ? 'Modo automático' : TooltipTree[colorMode]}>
        <IconButton onClick={handleChangeColorMode} className='h-max'>
            {isAutoMode ? <AutoAwesomeOutlinedIcon /> : (colorMode === 'light' ? <Brightness5Outlined /> : <Brightness4Outlined /> )}
        </IconButton>
            </Tooltip>
    )
}

export default ColorModeSwitch