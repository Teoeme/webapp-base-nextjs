'use client'
import useConfigurations from '@/app/hooks/useConfigurations'
import { Button, decomposeColor, hexToRgb, recomposeColor, rgbToHex, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LoadingButton from '../../LoadingButton';

const PaletteConfig = () => {
    const [palette, setPalette] = useState({});
    const [colorMode, setColorMode] = useState('light');
    const {getConfigByName,updateConfig,loading}=useConfigurations()

    const getPallette=async()=>{
        const res=await getConfigByName('palette')
        if(res?.ok){
            setPalette(res?.data.value)
        }
    }

    const handleSavePalette=async ()=>{
        let res=await updateConfig({name:'palette',value:palette})
    }

    useEffect(() => {
        getPallette()
    }, []);


  return (
<div className='p-2 flex gap-4 flex-col bg-background rounded '

>
    <div className='flex gap-6 items-center justify-between'>

    <p className='uppercase text-base '>Paleta de colores</p>

    <ToggleButtonGroup
    color='primary'
    onChange={(e)=>setColorMode(e.target.value)}
    value={colorMode}
    exclusive
    size='small'
    >
        <ToggleButton size='small' value={'light'}>Light</ToggleButton>
        <ToggleButton size='small' value={'dark'}>Dark</ToggleButton>
    </ToggleButtonGroup>

        </div>

    <div className=' flex gap-4 flex-wrap max-w-full'>
        {Object.keys(palette?.light||{})?.map(el=>{
            const value=palette[colorMode][el].split(' ')?.length ===3 ? recomposeColor({type:'rgb',values:palette[colorMode][el].split(' ')}) :palette[colorMode][el]
            const colorvalue=palette[colorMode][el].split(' ')?.length ===3 ? rgbToHex(recomposeColor({type:'rgb',values:palette[colorMode][el].split(' ')})) :palette[colorMode][el]
            return(
                <div key={`color-${colorMode}-${el}`} className=' size-20 flex flex-col items-center gap-1'>
                <input
                 type='color'
                 value={colorvalue}
                 onChange={(e)=>{
                    setPalette(pv=>({...pv,[colorMode]:{...pv[colorMode],[el]:decomposeColor(e.target.value).values.join(' ')}}))
                 }}
                 className=' shadow size-14 rounded-md overflow-hidden border-none p-0'
                 />
                 <p className='text-xs text-copy text-wrap overflow-hidden '>{el}</p>
                 </div>
            )
        })}
    </div>

<div className='w-full flex justify-end'>

    <LoadingButton onClick={handleSavePalette}
    title={'Guardar'}
    loading={loading}
    variant='contained'
    color='primary'
    />
    </div>
</div>
  )
}

export default PaletteConfig