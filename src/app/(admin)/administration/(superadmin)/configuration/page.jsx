import ConfigurationsMain from '@/app/components/configuration/ConfigurationsMain'
import PaletteConfig from '@/app/components/configuration/palette/PaletteConfig'
import { Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <div className='p-2'>
      <p className=' text-4xl font-bold uppercase text-copyLighter py-3'>
        Configuraciones
      </p>
<ConfigurationsMain  />

    </div>
  )
}

export default page