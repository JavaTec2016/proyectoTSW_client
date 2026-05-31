import React from 'react'
import { FormLabel, FormSelect } from 'react-bootstrap'
import { inputName } from './FormActions'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { printErrors } from './printErrors';

function FormSelectField({formId, inputId, options, label, register, validation, customErrors: customErrors, onInput}:{formId:string, inputId:string, options:{[x:string]:any}, label:string, register:UseFormRegister<FieldValues>, validation:{ [x: string]: RegisterOptions }, customErrors:React.ReactNode, onInput:()=>any}) {
    const id = inputName(formId, inputId);
  return (
    <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormSelect id={id} {...register(id, validation[id])} onInput={()=>onInput()}>
                {Object.keys(options).map(optValue=>(
                    <option value={optValue} key={optValue}>{options[optValue]}</option>
                ))}
            </FormSelect>
            {customErrors}
        </div>
  )
}

export default FormSelectField