import React from 'react'
import { FormLabel, FormSelect } from 'react-bootstrap'
import { inputName } from './FormActions'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { printErrors } from './printErrors';

function FormSelectField({formId, inputId, options, label, register, errors, validation, onInput}:{formId:string, inputId:string, options:{[x:string]:any}, label:string, register:UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, validation:{ [x: string]: RegisterOptions }, onInput:()=>any}) {
    const id = inputName(formId, inputId);
  return (
    <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormSelect id={id} {...register(id, validation[id])} onInput={()=>onInput()}>
                {Object.keys(options).map(optValue=>(
                    <option value={optValue} key={optValue}>{options[optValue]}</option>
                ))}
            </FormSelect>
            {errors[id] && errors[id]!.types && printErrors(errors[id] as ErrorOption)}
        </div>
  )
}

export default FormSelectField