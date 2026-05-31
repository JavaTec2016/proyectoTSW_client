import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import type { FormPresentation, FormRows, FormValidators } from './forms/FormComponent';
import { Tabler, type TablePresentation } from './Tabler';
import API from '../api/api';
import { clearPrefix, customValidate, inputName, limpiar, type CustomValidatorResults, type CustomValidatorSchema } from './forms/FormActions';
import toast from 'react-hot-toast';
import FormComponent from './forms/FormComponent';
import DetallerPanel, { type DetallerPresentation } from './DetallerPanel';
import DetallerFields from './DetallerFields';
const crudDefaults = {
    confirmation: 'Desea continuar?',
    success: 'Operacion exitosa',
    error: 'Error desconocido'
}
export type CrudMessages = {
    confirmation?: string;
    success?: string;
    error?: string;
}
export type CrudComponentAttributes = {
    //config de forms
    formRows: FormRows;
    createFormPresentation: FormPresentation;
    updateFormPresentation: FormPresentation;
    validators: FormValidators;
    labelSchema: { [x: string]: any };

    //config de detalles
    detailLayout: string[][];
    detailPresentation: DetallerPresentation;
    //config de tablas
    tableColumns: string[];
    primaryKey: string;
    tablePresentation: TablePresentation;

    //el crud
    endpoint: string;
    createMessages: CrudMessages;
    requestMessages?: CrudMessages;
    updateMessages: CrudMessages;
    deleteMessages: CrudMessages;
    serverErrorMessage: string;
}

function rebuildValidators(formId: string, validators: FormValidators) {
    const out: FormValidators = {};
    Object.keys(validators).forEach(field => {
        out[inputName(formId, field)] = validators[field];
    })
    return out;
}

function CrudComponent({ attributes, customValidatorSchema = {} }: { attributes: CrudComponentAttributes, customValidatorSchema?: CustomValidatorSchema }) {

    const [updateValues, setUpdateValues] = useState({});
    const [updateId, setUpdateId] = useState<any>(null);
    const [tableData, setTableData] = useState<{ [x: string]: any }[]>([]);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [hideDetail, setHideDetail] = useState(true);
    const [hideUpdateForm, setHideUpdate] = useState(true);
    const [detailData, setDetailData] = useState<{ [x: string]: any } | null>({})
    const [collapseSide, setCollapseSide] = useState(true);
    const createFormId = 'createform';
    const updateFormid = 'updateForm';
    //========CRUD

    function detalles(id: string) {
        setHideDetail(false);
        location.href = '#' + 'details'
        API.getDetail(attributes.endpoint, id).then(result => {
            if (result.error) {
                toast.error(result.error.detail)
                setDetailData(null);
            }
            setDetailData(result.data);
        })
    }
    function setModal(id: string) {
        API.getDetail(attributes.endpoint, id).then(result => {
            if (result.error) {
                toast.error(attributes.serverErrorMessage);
                console.error(result.error.detail);
                return;
            }
            setUpdateValues(result.data);
            setHideUpdate(false);
            setUpdateId(id);
        })
    }
    function eliminar(id: string) {
        confirm(attributes.deleteMessages.confirmation) ?
            API.delete(attributes.endpoint, id).then((res) => {
                if (res && res.error) {
                    toast.error(res.error.detail || crudDefaults.error);
                    console.error(res.error.detail);
                }
                else {
                    toast.success(attributes.deleteMessages.success || crudDefaults.success)
                    performSearch();
                }
            }) : -1;
    }
    function agregar(data: { [x: string]: any }) {
        API.post(attributes.endpoint, data).then(msg => {
            if (msg.error) {
                toast.error(msg.error.detail || crudDefaults.error);
                console.error(msg.error);
                return;
            }
            console.log('Lograo', attributes.createMessages.success)
            toast.success(attributes.createMessages.success || crudDefaults.success)
            performSearch();
        })
    }
    function actualizar(data: { [x: string]: any }) {
        if (updateId == null) return;
        API.update(attributes.endpoint, updateId, data).then(msg => {
            if (msg.error) {
                toast.error(msg.error.detail || crudDefaults.error);
                console.error(msg.error);
                return;
            }
            toast.success(attributes.updateMessages.success || crudDefaults.success)
            performSearch();
        })
    }
    function searchWith(formId: string) {
        const form = document.getElementById(formId) as HTMLFormElement;
        const data = clearPrefix(Object.fromEntries(new FormData(form).entries()));
        getRegistros(data);
    }
    async function getRegistros(filtros: { [x: string]: any } = {}) {
        const data = await API.getData(API.get(attributes.endpoint, filtros));
        setTableData(data);
    }
    //===validacion custom



    //===AUTO BUSQUEDA

    function performSearch() {
        if (toggleSearch) searchWith(createFormId);
        else getRegistros();
    }
    function onSearchToggle(state: boolean) {
        setToggleSearch(state);
        if (!state) getRegistros();
        else searchWith(createFormId);
    }
    function createChanged() {
        console.log(toggleSearch)
        if (!toggleSearch) return;
        searchWith(createFormId);
    }

    useEffect(() => {
        if (!API.accessToken) return;
        console.log('AUTH TOKEN: ', API.accessToken)
        getRegistros();
    }, [API.accessToken])

    ///=======CONTROLES DE INTERFAZ

    function closeUpdate() {
        setHideUpdate(true);
    }
    function closeDetail() {
        setHideDetail(true);
    }

    ///====EL ACHETEMELE
    const modal = (
        <div className='modal fade' id='modalEdit' aria-hidden='true' tabIndex={-1}>
            <div className='modal-dialog'>
                <div className="modal-content">
                    <FormComponent
                        id={updateFormid}
                        presentation={attributes.updateFormPresentation}
                        onSubmit={actualizar}
                        body={attributes.formRows}
                        validators={rebuildValidators(updateFormid, attributes.validators)}
                        values={updateValues}
                        customValidatorSchema={customValidatorSchema}
                        closeButton={
                            <button className='btn-close' data-bs-dismiss="modal" type="button" aria-label="Close"></button>
                        }
                    ></FormComponent>
                </div>
            </div>

        </div>
    )
    return (
        <>
            <div className='content-row'>

                <FormComponent
                    id={createFormId}
                    presentation={attributes.createFormPresentation}
                    onSubmit={agregar}
                    onchange={createChanged}
                    body={attributes.formRows}
                    validators={rebuildValidators(createFormId, attributes.validators)}
                    customValidatorSchema={customValidatorSchema}
                ></FormComponent>

                <div className='table-panel'>
                    <Tabler
                        onSearchToggle={onSearchToggle}
                        data={tableData}
                        columns={attributes.tableColumns}
                        columNames={attributes.tableColumns.map(col => attributes.labelSchema[col])}
                        primaryField={attributes.primaryKey}
                        onDelete={eliminar}
                        onDetail={detalles}
                        onEdit={setModal}
                        editButtonAttributes={{ 'data-bs-toggle': 'modal', 'data-bs-target': '#modalEdit' }}
                        headerData={attributes.tablePresentation}
                    ></Tabler>
                </div>
            </div>
            <br />
            {/** el modal q tiene q estar en el body o bustrap chilla */}
            {ReactDOM.createPortal(modal, document.body)}

            <hr />
            <DetallerPanel
                id='details'
                headerInfo={attributes.detailPresentation}
                hidden={hideDetail}
                setHidden={closeDetail}
            >
                {detailData == null ? (
                    <div>
                        <div className="form-row">
                            <p className="panel-title" style={{ color: 'var(--text-muted)' }}>{attributes.detailPresentation.error}</p>
                        </div>
                    </div>
                ) : (
                    <DetallerFields
                        data={detailData}
                        labelSchema={attributes.labelSchema}
                        layout={attributes.detailLayout}
                    ></DetallerFields>
                )}
            </DetallerPanel>
        </>
    )
}

export default CrudComponent