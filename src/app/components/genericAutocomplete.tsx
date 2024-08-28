'use client'
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import React from 'react'
import { gridPosition } from './customForm/CustomForm';

interface OptionType {
    value: any,
    label?: string,
    isNew?: boolean,
    _id?: string
}
interface GenericAutocompletePropsBase {
    options: OptionType[];
    label: string;
    handleAddNewValue?: (newValue: any) => void;
    className?: string;
    name: string,
    optionLabel?: string,
    valueLabel?: string,
    grid?: gridPosition,
    allowNewValue?: boolean
}

interface GenericAutocompletePropsMultiple extends GenericAutocompletePropsBase {
    value: OptionType[];
    onChange: (e: Object) => void;
    multiple: true;
}

interface GenericAutocompletePropsSingle extends GenericAutocompletePropsBase {
    value: OptionType;
    onChange: (e: Object) => void;
    multiple: false;
}

type GenericAutocompleteProps = GenericAutocompletePropsMultiple | GenericAutocompletePropsSingle;

const GenericAutocomplete = ({ value, onChange, options, label, name, handleAddNewValue, className, multiple = false, optionLabel = 'label', grid, allowNewValue = true, valueLabel = 'value' }: GenericAutocompleteProps) => {
    const filter = createFilterOptions<OptionType>();
    // console.log(options, value, valueLabel, multiple, optionLabel)

    return (
        <Autocomplete
            onChange={(event, newValue: OptionType | OptionType[]) => {
                if (Array.isArray(newValue)) {
                    // Caso multiple=true
                    const lastValue = newValue[newValue.length - 1];
                    if (lastValue?.isNew) {
                        handleAddNewValue(lastValue);
                    } else {
                        onChange({ target: { value: newValue, name } });

                    }
                } else {
                    // Caso multiple=false
                    if (newValue?.isNew) {
                        handleAddNewValue(newValue);
                    } else {
                        console.log('Seleccionado', newValue?.[valueLabel])
                        onChange({ target: { value: newValue?.[valueLabel], name } });
                    }
                }
            }}
            filterOptions={(options: OptionType[], params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options?.some((opt: OptionType) => inputValue === opt?.value);

                if (allowNewValue && inputValue !== '' && !isExisting) {
                    filtered.push({ value: inputValue, [optionLabel]: `Agregar nuevo ${inputValue}`, isNew: true });
                }

                return filtered;
            }}
            autoSelect
            clearOnBlur
            value={value}
            autoHighlight
            options={options}
            handleHomeEndKeys
            multiple={multiple}
            className={className}
            style={{
                gridColumnStart: grid?.colStart,
                gridColumnEnd: grid?.colEnd,
                gridRowStart: grid?.rowStart,
                gridRowEnd: grid?.rowEnd,
            }}
            getOptionLabel={(opt: OptionType) => {
                return opt?.[optionLabel] || opt
            }}
            isOptionEqualToValue={(opt: OptionType, val: any) => {
                return multiple ? opt?._id === val?._id : opt?.[valueLabel] === val
            }}
            renderOption={(props, option: OptionType) => <li {...props}>{option?.[optionLabel]}</li>}
            renderInput={(params) => {
                return (
                    <TextField {...params} label={label} fullWidth />
                )
            }}
        />
    )
}

export default GenericAutocomplete