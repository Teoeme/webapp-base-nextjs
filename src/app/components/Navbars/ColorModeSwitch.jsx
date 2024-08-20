'use client'
import React from 'react'
import Cookies from 'js-cookie'
import { IconButton, Tooltip } from '@mui/material'
import { Brightness4Outlined, Brightness5Outlined } from '@mui/icons-material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import useColorMode from '../../hooks/useColorMode'

const ColorModeSwitch = () => {
    const isAuto = Cookies.get('color-mode-auto') ==='true'
    const { setColorMode,colorMode } = useColorMode()

    const modeTree = {
        dark: 'light',
        light: isAuto ? 'dark' :'auto',
    }

    const TooltipTree={
        dark:'Modo oscuro',
        light:'Modo claro',
    }

    const handleChangeColorMode = () => {
        setColorMode(modeTree[colorMode])
    }

    return (
        <Tooltip title={isAuto ? 'Modo automático' : TooltipTree[colorMode]}>
        <IconButton onClick={handleChangeColorMode} className='h-max'>
            {isAuto ? <AutoAwesomeOutlinedIcon /> : (colorMode === 'light' ? <Brightness5Outlined /> : <Brightness4Outlined /> )}
        </IconButton>
            </Tooltip>
    )
}

export default ColorModeSwitch