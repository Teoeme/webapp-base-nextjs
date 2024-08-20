'use client'
import React, { useEffect, useState } from 'react'
import PaletteConfig from './palette/PaletteConfig'
import StringConfiguration from './StringConfiguration'
import useConfigurations from '../../hooks/useConfigurations'
import LoadingButton from '../LoadingButton'
import UsersAdmin from './User/UsersAdmin'
import ImageConfiguration from './ImageConfiguration'
import { enqueueSnackbar } from 'notistack'
import { Tooltip } from '@mui/material'




const ConfigurationsMain = () => {
  const [configurationsList, setConfigurationsList] = useState([]);
  const [configurationsGroups, setConfigurationsGroups] = useState([]);
  const { getAllConfigs, updateConfig, loading,updateImagesConfig } = useConfigurations()

  const getConfigs = async () => {
    let res = await getAllConfigs()

    if (res?.ok) {
      let list = []
      let groups = []
      res?.data?.map(el => {
        list.push({ ...el, edited: false })
        if (el?.group && !groups.includes(el?.group)) {
          groups.push(el.group)
        }
      })

      setConfigurationsList(list)
      setConfigurationsGroups(groups)
    }


  }

  useEffect(() => {
    getConfigs()
  }, []);

  const handleSaveConfigurations = async () => {
    for (let i = 0; i < configurationsList.length; i++) {
      const config = configurationsList[i];
      if (config.edited) {
        console.log(config)

        let res
        if (config.type === 'image' || config.type==='images') {
          res= await updateImagesConfig(config)
        }else{
          res=await updateConfig(config)
        }

        await getConfigs()
        enqueueSnackbar(res?.message || '',{variant:res?.ok ? 'success':'error'})
      }
    }
  }


  return (
    <div className='flex flex-col gap-4'>
      {configurationsGroups?.map(group => {
        return (
          <div key={group} className=' grid gap-2 grid-cols-8 border border-border p-2 rounded relative pt-6'>
            <p className=' absolute -top-2 left-2 bg-foreground px-2 z-10 text-xs'>{group}</p>

            {configurationsList?.filter(el => el.group === group)?.sort((a,b)=>a.type > b.type ? -1 : 1)?.map((el, i) => {
              const handleChange = (e) => {
                let newConfigs = [...(configurationsList || [])]
                const idx = newConfigs?.findIndex(e => e.name === el.name)
                newConfigs[idx]['value'] = e.target.value
                newConfigs[idx]['edited'] = true
                setConfigurationsList(newConfigs)
              }


              switch (el.type) {
                case 'string':
                  return (<Tooltip title={el?.helperText} enterDelay={1500} className='col-span-2 '><StringConfiguration fullWidth key={`configuration-string-${i}`} size='small' label={el?.label} value={el.value} onChange={handleChange} /></Tooltip>)

                case 'image':
                  return (<div className='col-span-1 flex justify-center'><ImageConfiguration key={`configuration-image-${i}`} value={el.value} label={el.label} imageName={el.name} onChange={handleChange} /></div>)
                default:
                  break;
              }


            })}
          </div>
        )
      })}
      <div className='col-end-5 flex justify-end'>
        <LoadingButton onClick={handleSaveConfigurations} loading={loading} color='primary' variant='contained' title={'Guardar'} />
      </div>
      <PaletteConfig />
      <UsersAdmin />
    </div>
  )
}

export default ConfigurationsMain