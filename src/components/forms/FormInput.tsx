import React from 'react'
import { FormControl, FormLabel } from 'react-bootstrap'
import { inputName } from './FormActions'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { printErrors } from './printErrors'
function FormInput({ formId, inputId, type, label, register, validation, onInput, customErrors }: { formId: string, inputId: string, type: string, label: string, register: UseFormRegister<FieldValues>, validation: { [x: string]: RegisterOptions }, onInput: () => any, customErrors?:React.ReactNode }) {
    const id = inputName(formId, inputId);
    return (
        <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormControl type={type} id={id} {...register(id, validation[id])} onInput={() => onInput()} />
                {customErrors}
        </div>
    )
}

export default FormInput