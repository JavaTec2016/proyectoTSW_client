import API from "../../api/api";

export type CustomValidatorSchema = {
  [x:string]:{
    [x:string]:CustomValidator;
  }
}
export type CustomValidator = (formValues:{[x:string]:any}) => string | null | void;
export type CustomValidatorResults = {[x:string]:string[]}

export const ID_SPLIT = '@';
export function limpiar(id:string) {
  const form = new FormData(document.getElementById(id)! as HTMLFormElement);
  form.forEach((entry, key) => {
    let inp = document.getElementById(key)!;
    inp instanceof HTMLInputElement || inp instanceof HTMLSelectElement || inp instanceof HTMLTextAreaElement
      ? (inp.value = "")
      : -1;
  });
}
export function clearPrefix(data: { [x: string]: any }) {
    const cleared: { [x: string]: any } = {};
    
    for (const key in data) {
        const parts = key.split(ID_SPLIT)
        cleared[parts.pop()!] = data[key];
    }
    return cleared;
}

export function extraer(form:HTMLFormElement){
  return clearPrefix(Object.fromEntries(new FormData(form).entries()));
}

export function inputName(formId:string, inputId:string){
  return formId+ID_SPLIT+inputId;
}
export function makeDatatableColumns(...cols:string[]){
  const columns:{[x:string]:string}[] = [];
  cols.forEach(col=>{
    columns.push({data:col})
  })
  return columns;
}

export function customValidate(schema:CustomValidatorSchema, formId:string){
  const failures:CustomValidatorResults = {};
  const formData = extraer(document.getElementById(formId) as HTMLFormElement);
  //validar todos los datos que tengan custom validators
  for(const field in formData){
    const callbacks = schema[field];
    if(!callbacks) continue;

    Object.values(callbacks).forEach(callback=>{ //apilar errores del campo, o no si no hay
      let error = callback((formData));
      if(!error) return;
      if(!(field in failures)) failures[field] = [];
      failures[field].push(error);
    })
  }
  return failures;
}

export async function getOptionsOf(categoria:string){
  const res = API.get(categoria+API.DISPLAY_END, null);
  if((await res).error) return res;
  const data = await API.getData(res);
  const out:{[x:string]:any} = {}
  data.forEach((row:{[x:string]:any})=>{
    out[row['key']] = row['display']
  })
  return out;
}