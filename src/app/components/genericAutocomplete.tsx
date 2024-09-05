'use client'
import { Autocomplete, AutocompleteProps, StandardTextFieldProps, TextField, createFilterOptions } from '@mui/material';
import React from 'react'
import { gridPosition } from './customForm/CustomForm';

export interface OptionType {
    value: any,
    label?: string,
    isNew?: boolean,
    _id?: string
}

interface GenericAutocompletePropsBase<T> {
    autocompleteprops?: AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>,
    options: OptionType[];
    label?: string;
    handleAddNewValue?: (newValue: any) => void;
    className?: string;
    name: string,
    optionLabel?: string,
    valueLabel?: string,
    grid?: gridPosition,
    allowNewValue?: boolean,
    Multiple?: boolean | undefined,
    DisableClearable?: boolean | undefined,
    FreeSolo?: boolean | undefined,
    ChipComponent?: React.ElementType,
    renderInputProps?: StandardTextFieldProps
}

interface GenericAutocompletePropsMultiple extends GenericAutocompletePropsBase<OptionType[]> {
    value: OptionType[];
    onChange: (e: Object) => void;
    multiple: true;
}

interface GenericAutocompletePropsSingle extends GenericAutocompletePropsBase<OptionType> {
    value: OptionType;
    onChange: (e: Object) => void;
    multiple: false;
}

type GenericAutocompleteProps = GenericAutocompletePropsMultiple | GenericAutocompletePropsSingle;

const GenericAutocomplete = ({ value, onChange, options, label, name, handleAddNewValue, className, multiple = false, optionLabel = 'label', grid, allowNewValue = true, valueLabel = 'value',autocompleteprops,renderInputProps,...rest }: GenericAutocompleteProps) => {
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
                        console.log('Seleccionado', newValue?.[valueLabel] || newValue)
                        onChange({ target: { value: newValue?.[valueLabel] || newValue, name } });
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
            renderOption={(props, option: OptionType) => <li {...props}>{option?.[optionLabel]||option}</li>}
            renderInput={(params) => {
                return (
                    <TextField
                    {...params}
                    {...renderInputProps} 
                    InputProps={{...params.InputProps,...renderInputProps?.InputProps}} 
                    label={label} fullWidth />
                )
            }}
        {...autocompleteprops}
            {...rest}
        />
    )
}

export default GenericAutocomplete