import { AddCircleOutline, Delete, Edit } from '@mui/icons-material'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, DataGridProps, GridColDef, GridRenderCellParams, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { GridBaseColDef } from '@mui/x-data-grid/internals'
import React from 'react'

export interface CustomTableGridColRef extends GridBaseColDef {
    mobile?: boolean,
    renderCellMobile?: Function
}

interface CustomTableProps extends DataGridProps {
    data: any[],
    columns: GridColDef[],
    handleEdit?: (row: any) => void,
    handleDelete?: (row: any) => void,
    handleAdd?: () => void,
    tableTitle?: string,
    quickFilter?: boolean
}


const CustomTable = ({ data, columns, handleEdit, handleDelete, handleAdd, tableTitle, quickFilter = false, ...rest }: CustomTableProps) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    let TableColumns:CustomTableGridColRef[] = columns

    if (isMobile) {
        TableColumns= []
        let mainColumnFields = []

        columns?.forEach((col: CustomTableGridColRef, idx) => {
            if (col?.mobile) {
                mainColumnFields.push({ field: col.field, render: col.renderCellMobile ? (params) => col?.renderCellMobile(params) : undefined })
            }
            TableColumns.push({
                field:col?.field,
            })
        })

        TableColumns.push({
            field:'Marca',
            headerName:tableTitle,
            flex:1,
            renderCell:(params)=>{
                return(
                        <div className='flex h-full justify-start relative'>
                    <div className='flex flex-wrap w-full h-full gap-2 items-center p-1'>

                        {mainColumnFields?.map((col)=>{
                            return col?.render ? col.render(params) : <p className='h-6 text-copy w-max flex items-center'>{params?.row?.[col.field]}</p>})}
                            </div>
                             <div className=' absolute top-1 right-0 h-6 flex items-center '>
                        {handleEdit && <IconButton size='small' color='warning' onClick={() => handleEdit(params.row)}><Edit fontSize='small' /></IconButton>}
                        {handleDelete && <IconButton size='small' color='error' onClick={() => handleDelete(params.row)}><Delete fontSize='small' /></IconButton>}
                    </div>
                    </div>
                )
            }
        })

    }else{
        TableColumns=[...(columns || []), {
            headerName: "Acciones",
            renderCell: (params: GridRenderCellParams) => {
    
                return (
                    <div>
                        {handleEdit && <IconButton size='small' color='warning' onClick={() => handleEdit(params.row)}><Edit fontSize='small' /></IconButton>}
                        {handleDelete && <IconButton size='small' color='error' onClick={() => handleDelete(params.row)}><Delete fontSize='small' /></IconButton>}
                    </div>
                )
            },
            field: ''
        },
        ]
    }

    const customHeader = () => {
        return (
            <div className='flex justify-between p-2 bg-primaryDark text-primaryContent py-4 gap-2 md:items-center flex-col md:flex-row'>
                {tableTitle && <p className=' uppercase text-xl font-semibold'>{tableTitle}</p>}
                <div className='flex w-full justify-between md:justify-start'>
                    {quickFilter && <GridToolbarQuickFilter color='primary'  />}
                    {handleAdd && <IconButton size='small' color='inherit' onClick={handleAdd}><AddCircleOutline /></IconButton>}
                </div>
            </div>
        )
    }

    console.log(isMobile)

    return (
        <DataGrid
            ignoreDiacritics
            rows={data}
            columns={TableColumns}
            getRowId={(row) => row?._id}
            slots={{
                toolbar: customHeader
            }}
            rowHeight={isMobile && 100}
            columnVisibilityModel={
                isMobile && columns?.map(col=>({[col.field]:false}))?.reduce((a,v)=>({...a,...v}))
            }

            initialState={{
                filter:{
                    filterModel:{
                        items:[],
                        quickFilterExcludeHiddenColumns:false
                    }
                },
                columns:{
                    columnVisibilityModel:isMobile && columns?.map(col=>({[col.field]:false}))?.reduce((a,v)=>({...a,...v}))
                }
            }}
            {...rest}

        />
    )
}

export default CustomTable