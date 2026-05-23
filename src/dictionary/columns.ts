const Names = {
    DONADOR_CATEGORIA:'Donador_Categoria',
    CORPORACION: 'Corporacion',
} as const;
type Names = (typeof Names)[keyof typeof Names]

interface Columns {
    [x:string]:string,
}
const Columns = {
    Donador_Categoria:{
        'id':'ID',
        'nombre':'Nombre',
    },
    Corporacion:{
        'id':'ID',
        'nombre:':'Nombre'
    }
}
export {Names, Columns};