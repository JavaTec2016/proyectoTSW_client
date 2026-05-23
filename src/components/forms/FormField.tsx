import React from 'react'
import { FormControl, FormLabel } from 'react-bootstrap'
import { inputName } from './FormActions'
import type { ErrorOption, FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { printErrors } from './printErrors'
function FormField({ formId, inputId, type, label, register, errors, validation, onInput }: { formId: string, inputId: string, type: string, label: string, register: UseFormRegister<FieldValues>, errors: FieldErrors<FieldValues>, validation: { [x: string]: RegisterOptions }, onInput: () => any }) {
    const id = inputName(formId, inputId);
    return (
        <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <FormControl type={type} id={id} {...register(id, validation[id])} onInput={() => onInput()} />
            {errors[id] && errors[id]!.types && printErrors(errors[id] as ErrorOption)}
        </div>
    )
}

export default FormField