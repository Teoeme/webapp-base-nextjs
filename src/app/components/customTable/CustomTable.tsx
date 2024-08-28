import {  AddCircleOutline, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { DataGrid, DataGridProps, GridColDef, GridRenderCellParams, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'

interface CustomTableProps extends DataGridProps{
    data:any[],
    columns:GridColDef[],
    handleEdit?:(row:any)=>void,
    handleDelete?:(row:any)=>void,
    handleAdd?:()=>void,
    tableTitle?:string,
    quickFilter?:boolean
}

const CustomTable = ({data,columns,handleEdit,handleDelete,handleAdd,tableTitle,quickFilter=false,...rest}:CustomTableProps) => {

    const extendedColumns:GridColDef[]=[...(columns||[]),{
        headerName:"Acciones",
        renderCell:(params:GridRenderCellParams)=>{

            return(
                <div>
                    {handleEdit && <IconButton size='small' color='warning' onClick={()=>handleEdit(params.row)}><Edit fontSize='small' /></IconButton>}
                    {handleDelete && <IconButton size='small' color='error' onClick={()=>handleDelete(params.row)}><Delete fontSize='small' /></IconButton>}
                </div>
            )
        },
        field:''
    },
]

const customHeader=()=>{
    return(
        <div className='flex justify-between p-2 bg-primaryDark text-primaryContent py-4 items-center'>
            {tableTitle  && <p className=' uppercase text-xl font-semibold'>{tableTitle}</p>}
            <div>
            {quickFilter && <GridToolbarQuickFilter color='primary' />}
            {handleAdd && <IconButton size='small' color='inherit' onClick={handleAdd}><AddCircleOutline /></IconButton>}
            </div>
        </div>
    )
}
  return (
    <DataGrid
    ignoreDiacritics
    rows={data}
    columns={extendedColumns}
    getRowId={(row)=>row?._id}
    slots={{
        toolbar:customHeader
    }}
   
    {...rest}

    />
  )
}

export default CustomTable