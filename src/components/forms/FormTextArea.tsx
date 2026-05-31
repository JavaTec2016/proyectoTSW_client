import React from 'react'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { inputName } from './FormActions';
import { FormLabel, FormText } from 'react-bootstrap';
import { printErrors } from './printErrors';

function FormTextArea({formId, inputId, label, register, validation, customErrors, onInput}:{formId:string, inputId:string, label:string, register:UseFormRegister<FieldValues>, validation:{ [x: string]: RegisterOptions }, customErrors:React.ReactNode, onInput:()=>any}) {
  const id = inputName(formId, inputId);
  return (
    <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <textarea id={id} {...register(id, validation[id])} onInput={()=>onInput()} className='form-control'></textarea>
            {customErrors}
        </div>
  )
}

export default FormTextArea