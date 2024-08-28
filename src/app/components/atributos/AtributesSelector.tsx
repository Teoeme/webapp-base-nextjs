import { Autocomplete, IconButton, TextField, createFilterOptions } from '@mui/material'
import React from 'react'
import { AddCircleOutline, Delete, Edit } from '@mui/icons-material'
import useModal from '@/app/hooks/useModal'
import { useAttribute } from '@/app/hooks/useAttribute'
import { useConfirm } from 'material-ui-confirm'
import AddAttrinuteModal from './AddAttributeModal'
import Image from 'next/image'
import AtributeIcon from './AtributeIcon'

interface IAtributo {
    Name: string,
    Options?: string[],
    Value?: string,
    Icon?:[],
    _id?:string
}
interface AtributeSelectorProps {
    value: IAtributo[],
    onChange: Function,
    name: string,
    className?: string,
    variant?: 'outlined' | 'standard' | 'filled'
}

const AtributesSelector = ({ value, onChange, name, className, variant }: AtributeSelectorProps) => {
    const { attributeList, handleSubmit, deleteAttribute } = useAttribute()
    const confirm = useConfirm()
    const { open, data } = useModal('AddAttributeModal')
    const filter = createFilterOptions<IAtributo>();
    const atrOptionsFilter = createFilterOptions<string>();


    const handleAdd = () => {
        let newAttibutes = []
        if (value?.length > 0) {
            newAttibutes = [...value]
        }
        newAttibutes.push({})
        onChange({ target: { name, value: newAttibutes } })
    }

    const handleDelete = (el) => {
        confirm({
            title: "Eliminar atributo",
            description: `¿Desea elimimar definitivamente el atributo ${el?.Name}? 
            Todos los productos que posean este atributo, dejarán de hacerlo.`,
            confirmationButtonProps: { color: 'error', title: "Eliminar" }, confirmationText: "Eliminar",
            cancellationText: "Cancelar"
        })
            .then(async () => {
                let res = await deleteAttribute(el)
                console.log(res, 'DELETE AtRIBUTE')
            })
    }

    return (
        <div className={`border border-zinc-300/40 relative p-2 rounded ${className}`}>
            <p className='absolute -top-2 px-1 bg-foreground text-xs text-copyLight'>
                Atributos
            </p>
            <span className='flex w-full justify-end -my-1 '>
                <IconButton color='primary' size='small' onClick={handleAdd}
                  
                ><AddCircleOutline /></IconButton>
            </span>
            <div className='flex flex-col gap-2'>

                {value?.map((el, idx) => {
                    const handleChangeAttribute = (newValue, key?: string) => {
                        let newAttibutes = [...value]
                        if (key) {
                            newAttibutes[idx] = { ...newAttibutes[idx], [key]: newValue }
                        } else {
                            newAttibutes[idx] = newValue
                        }
                        onChange({ target: { name, value: newAttibutes } })
                    }

                    const handleRemove = () => {
                        let newAttibutes = [...value]
                        newAttibutes = newAttibutes?.filter((e, i) => i !== idx)
                        console.log(newAttibutes, 'NEWS')
                        onChange({ target: { name, value: newAttibutes } })
                    }

                    let valueOptions = el?.Options || []

                    if (!el?.Options && attributeList?.length > 0) {
                        valueOptions = attributeList?.filter(e => e.Name === el.Name)?.[0]?.Options
                    }

                    return (

                        <div className={`w-full flex gap-1 `}>
                            
                            <Autocomplete className='w-1/2'
                                size='small'
                                options={attributeList?.filter(e => {
                                    return !value?.some(val => val._id === e._id)
                                }) || []}
                                renderInput={(params) => <TextField variant={variant} {...params} />}
                                getOptionLabel={opt => opt?.Name ? opt?.Name : opt}
                                isOptionEqualToValue={(opt, val) => opt?.Name === val}
                                onChange={(e, nv, reason) => {
                                    if (reason === 'clear') {
                                        handleRemove()
                                        return
                                    }
                                    if (nv?.Value === 'new') {
                                        open({ Title: "Agregar nuevo atributo", Mode: "Add" })
                                    } else {
                                        handleChangeAttribute({ Name: nv?.Name, Options: nv?.Options, Value: null,Icon:nv?.Icon,_id:nv?._id })
                                    }

                                }}
                                renderOption={(props, opt) => {
                                    const { key, ...rest } = props
                                    return <li {...rest} className={` ${rest.className} !flex !justify-between`}>
                                        <span className=' flex gap-2 items-center'>
                                        {opt?.Icon?.[0] && <AtributeIcon className='size-5'  icon={opt?.Icon?.[0]}/>}
                                        <p>{key}</p>
                                        </span>
                                        <div>
                                            <IconButton onClick={() => open({ ...opt, Mode: 'Edit', Title: "Editar atributo" })} size='small' color='warning'><Edit fontSize='small' className='text-sm' /></IconButton>
                                            <IconButton onClick={() => handleDelete(opt)} size='small' color='error'><Delete fontSize='small' className='text-sm' /></IconButton>
                                        </div>
                                    </li>
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    filtered.push({
                                        Value: 'new',
                                        Name: `+ Agregar nuevo atributo`,
                                    });

                                    return filtered;
                                }}
                                value={el.Name}

                            />
                            {(el?.Options?.length > 0 || el?.Value) &&
                                <Autocomplete
                                    size='small'
                                    className='w-1/2'
                                    options={valueOptions || []}
                                    renderInput={(params) => <TextField variant={variant} {...params} />}
                                    value={el.Value}
                                    onChange={(e, nv) => {
                                        if (nv?.slice(0, 9) === '+ Agregar') {
                                            let newValue = nv?.match(/"(.*?)"/g)?.[0]?.slice(1, -1);
                                            confirm({ title: "Agregar valor al atributo", description: `Desea agregar el valor "${newValue}" al atributo "${el?.Name}"?` })
                                                .then(async () => {
                                                    let res = await handleSubmit({ ...el, Options: [...valueOptions, newValue], Mode: 'Edit' })
                                                    if (res?.ok) {
                                                        handleChangeAttribute({ Value: newValue, Options: [...(el.Options || []), newValue], Name: el.Name,Icon:el?.Icon })
                                                    }
                                                })

                                        } else {
                                            handleChangeAttribute(nv, 'Value')
                                        }
                                    }}

                                    filterOptions={(options, params) => {
                                        const filtered = atrOptionsFilter(options, params);
                                        if (filtered && filtered?.length === 0) {
                                            filtered.push(`+ Agregar "${params?.inputValue}"`);
                                        }

                                        return filtered;
                                    }}

                                />
                            }

                        </div>
                    )
                })}
            </div>

            <AddAttrinuteModal />
        </div>
    )
}

export default AtributesSelector