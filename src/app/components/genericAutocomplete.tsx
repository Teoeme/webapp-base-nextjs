'use client'
import { Autocomplete, Popper, TextField, createFilterOptions } from '@mui/material';
import React from 'react'

interface OptionType{
    value:any,
    label?:string,
    isNew?:boolean
}
interface GenericAutocompletePropsBase {
    options: OptionType[];
    label: string;
    handleAddNewValue: (newValue: any) => void;
    className?: string;
  }
  
  interface GenericAutocompletePropsMultiple extends GenericAutocompletePropsBase {
    value: OptionType[];
    setValue: (value: OptionType[] | ((prev: OptionType[]) => OptionType[])) => void;
    multiple: true;
  }
  
  interface GenericAutocompletePropsSingle extends GenericAutocompletePropsBase {
    value: OptionType;
    setValue: (value: OptionType | ((prev: OptionType) => OptionType)) => void;
    multiple: false;
  }
  
  type GenericAutocompleteProps = GenericAutocompletePropsMultiple | GenericAutocompletePropsSingle;
  
const GenericAutocomplete = ({ value, setValue,options,label,handleAddNewValue,className,multiple }:GenericAutocompleteProps) => {
    const filter = createFilterOptions<OptionType>();

    return (
        <Autocomplete
            onChange={(event, newValue:OptionType|OptionType[]) => {
                if (Array.isArray(newValue)) {
                    // Caso multiple=true
                    const lastValue = newValue[newValue.length - 1];
                    if (lastValue?.isNew) {
                        handleAddNewValue(lastValue);
                    } else {
                        setValue(newValue);
                    }
                } else {
                    // Caso multiple=false
                    if (newValue?.isNew) {
                        handleAddNewValue(newValue);
                    } else {
                        setValue(newValue);
                    }
                }
            }}
            filterOptions={(options:OptionType[], params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options?.some((opt:OptionType) => inputValue === opt?.value);
                
                console.log(isExisting,'Exist',inputValue)
                
                if (inputValue !== '' && !isExisting) {
                    filtered.push({ value:inputValue, label:`Agregar nuevo ${inputValue}`,isNew:true });
                }
                
                return filtered;
            }}
            multiple={multiple}
            fullWidth
            clearOnBlur
            disablePortal
            selectOnFocus
            options={options}
            handleHomeEndKeys
            value={value || []}
            className={className}
            getOptionLabel={(opt:OptionType) => opt.label}
            isOptionEqualToValue={(opt:OptionType, val:OptionType) => opt.value === val.value}
            renderOption={(props, option:OptionType) =><li {...props}>{option?.label}</li>}
            renderInput={(params) => {
                return (
                    <TextField {...params} label={label} fullWidth />
                )
            }} 
            />
    )
}

export default GenericAutocomplete