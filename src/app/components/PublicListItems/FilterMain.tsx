'use client'
import React, { useMemo } from 'react'
import FilterProducts, { FilterField } from '../filter/FilterProducts'
import useCRUD from '@/app/hooks/useCRUD'
import { selectOptions } from '../customForm/CustomForm'


const FilterMain = () => {
    const { listData: marcasList } = useCRUD('vehiculos/marcas')

    const añosOptions = useMemo(() => {
        const años = [{label:'Todos',value:'all'}];
        const añoActual = new Date().getFullYear() + 1; // Próximo año
        
        for (let i = añoActual; i >= añoActual - 75; i--) {
            //@ts-ignore
            años.push({ label: `${i}`, value: i });
        }

        return años;
    }, []);

    const combustibleOptions = [{label:"Todos",value:"all"},{ label: "Nafta", value: "nafta" }, { label: "Diesel", value: "diesel" }, { label: "GNC", value: "gnc" }]

    const transmisionOptions=[
        {label:"Todas",value:'all'},
        {label:"Automática",value:'automatica'},
        {label:"Manual",value:'manual'},
    ]

    const filterFields: FilterField[] = [
        {
            queryParamName: 'marca',
            type: 'select',
            options: marcasList?.map((m): selectOptions => ({ value: m.name, label: m.name })),
            combinable: true,
            label: 'Marca',
            className: " w-full"
        },
        {
            queryParamName: 'marca',
            type: 'autocomplete',
            options: añosOptions,
            combinable: true,
            label: 'Año',
            className: " w-full"
        },
        {
            queryParamName: 'combustible',
            type: 'select',
            options: combustibleOptions,
            combinable: true,
            label: 'Combustible',
            className: " w-full"
        },
        {
            queryParamName: 'transmision',
            type: 'select',
            options: transmisionOptions,
            combinable: true,
            label: 'Transmisión',
            className: " w-full"
        },
    ]


    return (
        <div className=' md:w-[20vw] p-2 bg-background rounded-lg'>
            <FilterProducts fields={filterFields} className=' flex flex-col gap-4 p-2' />
        </div>
    )
}

export default FilterMain