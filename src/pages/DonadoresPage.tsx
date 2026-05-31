import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Navigation } from '../components/Navigation';
import Breadcrumb from '../components/Breadcrumb';
import CrudComponent, { type CrudComponentAttributes } from '../components/CrudComponent';
import type { FormRows } from '../components/forms/FormComponent';
import { getOptionsOf } from '../components/forms/FormActions';
import API from '../api/api';
const labels = {
    id: 'ID',
    nombre: 'Nombre',
    primer_ap: 'Primer Apellido',
    segundo_ap: 'Segundo Apellido',
    direccion: 'Dirección',
    telefono: 'Teléfono',
    email: 'Correo Electrónico',
    categoria: 'Categoría',
    categoria_display: 'Categoría',
    anio_graduacion: 'Año de Graduación',
    id_clase: 'Clase',
    id_clase_display: 'Clase',
    id_corporacion: 'Corporación',
    id_corporacion_display: 'Corporación',
    nombre_conyuge: 'Conyuge',
    id_corporacion_conyuge: 'Corporación del Conyuge',
    id_corporacion_conyuge_display: 'Corporación del Conyuge',
}

function DonadoresPage() {
    const [categorias, setCategorias] = useState<{ [x: string]: any }>({ '': 'Cargando...' });
    const [clases, setClases] = useState<{ [x: string]: any }>({ '': 'Cargando...' });
    const [corporaciones, setCorporaciones] = useState<{ [x: string]: any }>({ '': 'Cargando...' });
    const formConfig: FormRows = [
        [
            {
                field: 'nombre',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['nombre']
                }
            },
        ],
        [
            {
                field: 'primer_ap',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['primer_ap']
                }
            },
            {
                field: 'segundo_ap',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['segundo_ap']
                }
            },
        ],
        [
            {
                field: 'direccion',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['direccion']
                }
            },
        ],
        [
            {
                field: 'telefono',
                config: {
                    name: 'input',
                    type: 'number',
                    label: labels['telefono']
                }
            },
            {
                field: 'email',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['email']
                }
            }
        ],
        [
            {
                field: 'categoria',
                config: {
                    name: 'select',
                    options: categorias,
                    label: labels['categoria']
                }
            }
        ],
        [
            {
                field: 'anio_graduacion',
                config: {
                    name: 'input',
                    type: 'number',
                    label: labels['anio_graduacion']
                }
            },
            {
                field: 'id_clase',
                config: {
                    name: 'select',
                    options: clases, //SELEC
                    label: labels['id_clase']
                }
            }
        ],
        [
            {
                field: 'id_corporacion',
                config: {
                    name: 'select',
                    options: corporaciones,
                    label: labels['id_corporacion']
                }
            }
        ],
        [
            {
                field: 'nombre_conyuge',
                config: {
                    name: 'input',
                    type: 'text',
                    label: labels['nombre_conyuge']
                }
            },
            {
                field: 'id_corporacion_conyuge',
                config: {
                    name: 'select',
                    options: corporaciones,
                    label: labels['id_corporacion_conyuge']
                }
            }
        ]
    ]
    const crudAttributes: CrudComponentAttributes = {
        formRows: formConfig,
        createFormPresentation: {
            title: 'Nuevo Donador',
            subtitle: 'Ingrese la informacion'
        },
        updateFormPresentation: {
            title: 'Actualizar Donador',
            subtitle: 'Ingrese la informacion'
        },
        validators: {
            nombre: {
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
                pattern: {
                    value: /^[0-9A-Za-z ]+$/,
                    message: "Solo se permiten numeros, espacios y letras",
                }
            },
            primer_ap: {
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
                pattern: {
                    value: /^[0-9A-Za-z ]+$/,
                    message: "Solo se permiten numeros, espacios y letras",
                }
            },
            segundo_ap: {
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
                pattern: {
                    value: /^[0-9A-Za-z ]+$/,
                    message: "Solo se permiten numeros, espacios y letras",
                }
            },
            direccion:{
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
            },
            telefono:{
                required: "Campo requerido",
                maxLength: { value: 10, message: "No puede superar 10 dígitos" },
                minLength: { value: 10, message: "Debe ser menor a 10 dígitos" },
                pattern: {
                   value: /^[0-9]+$/,
                   message: "Sólo se permiten números",
                },
            },
            email:{
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Debe ser un correo electrónico válido",
                },
            },
            categoria:{
                required: 'Campo requerido'
            },
            anio_graduacion:{
                required: "Campo requerido",
                maxLength: { value: 5, message: "No puede superar 5 dígitos" },
                minLength: { value: 4, message: "Debe ser menor a 4 dígitos" },
                pattern: {
                   value: /^[0-9]+$/,
                   message: "Sólo se permiten números",
                },
            },
            id_clase:{
                required: 'Campo requerido'
            },
            id_corporacion:{
                required: 'Campo requerido'
            },
            nombre_conyuge:{
                required: "Campo requerido",
                maxLength: { value: 100, message: "No puede superar 100 caracteres" },
                pattern: {
                    value: /^[0-9A-Za-z ]+$/,
                    message: "Solo se permiten numeros, espacios y letras",
                }
            },
            id_corporacion_conyuge:{
                required: 'Campo requerido'
            }
        },
        labelSchema: labels,
        detailLayout: [['id', 'nombre', 'primer_ap', 'segundo_ap'], ['direccion', 'telefono', 'email'], ['categoria_display', 'anio_graduacion', 'id_clase_display'], ['nombre_conyuge', 'id_corporacion_conyuge_display']],
        detailPresentation: {
            title: 'Detalles del donador',
            subtitle: 'Informacion'
        },
        tableColumns: ['nombre', 'primer_ap', 'categoria_display', 'id_clase_display'],
        primaryKey: 'id',
        tablePresentation: {
            title: 'Donadores',
            subtitle: 'Listado',
        },

        endpoint: API.DONADORES,
        createMessages: {
            success: 'Donador creado'
        },
        updateMessages: {
            success: 'Donador actualizado'
        },
        deleteMessages: {
            confirmation: 'Desea eliminar el Donador? cualquier registro asociado sera eliminado',
            success: 'Donador eliminado'
        },
        serverErrorMessage: 'Error del servidor, intentelo mas tarde'
    }

    useEffect(() => {
        getOptionsOf(API.CATEGORIAS).then(data => {
            setCategorias({...data, '':'Seleccionar...'});
        }).catch(e=>{
            console.log(e)
        })
        getOptionsOf(API.CORPORACONES).then(data => {
            setCorporaciones({...data, '':'Seleccionar...'});
        })
        getOptionsOf(API.CLASES).then(data => {
            if(data.error){
                console.error(data.error)
            }
            console.log(data)
            setClases({...data, '':'Seleccionar...'});
        })
    }, [])
    useEffect(() => {
        return;
    }, [categorias, corporaciones])
    return (
        <div className="app-shell">
            <Navigation includeSidebar={true}>
                <Nav>
                    <Nav.Link href="#top">Inicio</Nav.Link>
                    <Nav.Link href="/colectas">Colectas</Nav.Link>
                </Nav>
            </Navigation>
            <Breadcrumb path="Colectas/Donadores" />

            <main className="page-content">
                <CrudComponent
                    attributes={crudAttributes}
                    
                />
            </main>
        </div>
    );
}

export default DonadoresPage