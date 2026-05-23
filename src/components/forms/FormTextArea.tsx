import React from 'react'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { inputName } from './FormActions';
import { FormLabel, FormText } from 'react-bootstrap';
import { printErrors } from './printErrors';

function FormTextArea({formId, inputId, label, register, errors, validation, onInput}:{formId:string, inputId:string, label:string, register:UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, validation:{ [x: string]: RegisterOptions }, onInput:()=>any}) {
  const id = inputName(formId, inputId);
  return (
    <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <textarea id={id} {...register(id, validation[id])} onInput={()=>onInput()} className='form-control'></textarea>
            {errors[id] && errors[id]!.types && printErrors(errors[id] as ErrorOption)}
        </div>
  )
}

export default FormTextArea