import API from "../api/api";
import { Tabler } from "../components/Tabler";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { Navigation } from "../components/Navigation";
import Breadcrumb from "../components/Breadcrumb";
import { clearPrefix } from "../components/forms/FormActions";
import DetallerPanel from "../components/DetallerPanel";
import { Nav } from "react-bootstrap";
import DetallerFields from "../components/DetallerFields";
import EventoForm from "../components/forms/EventoForm";


export function EventosPage() {
    const [hideForm, setHideForm] = useState(true);
    const [updateData, setUpdateData] = useState({});
    const [updateId, setUpdateId] = useState<any>(null);
    const [tableData, setTableData] = useState<{ [x: string]: any }[]>([]);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [hideDetail, setHideDetail] = useState(true);
    const [detailData, setDetailData] = useState<{ [x: string]: any } | null>({})
    const [hideEdit, setHideEdit] = useState(true);
    const ENDPOINT = API.EVENTOS;
    const deleteConfirm = 'Desea ELIMINAR el evento? cualquier registro que lo utilice tambien sera eliminado.';
    const deleteMsg = 'Evento eliminado';
    const postMsg = "Evento agregado";
    const putMsg = "Evento modificado";
    const serverErrorMsg = 'Error del servidor, intentelo mas tarde';
    const detailError = 'Error al cargar los detalles, intentelo mas tarde'
    const tableColumns = ['nombre', 'tipo', 'fecha_inicio'];
    const tableColumnNames = ['Nombre', 'Tipo', 'Fecha de inicio'];
    const tableHeader = { title: 'Eventos'.toUpperCase(), subtitle: 'Registros' };
    const detailHeader = { title: 'Evento', subtitle: 'Detalles' };
    const formPostInfo = {title:'Agregar Evento', subtitle:'Ingrese la información'};
    const formPutInfo = {title:'Actualizar Evento', subtitle:'Ingrese la información'};
    const labels = {
        id: 'ID',
        nombre: 'Nombre',
        fecha_inicio: 'Fecha de inicio',
        fecha_fin: 'Fecha de fin',
        tipo: 'Tipo de evento',
        descripcion: 'Descripcion',
    }
   function detalles(id: string) {
        setHideDetail(false);
        location.href = '#' + 'detalle'
        API.getDetail(ENDPOINT, id).then(result => {
            if (result.error) {
                toast.error(result.error.detail)
                setDetailData(null);
            }
            setDetailData(result.data);
        })
    }
    function setModal(id: string) {
        API.getDetail(ENDPOINT, id).then(result => {
            if (result.error) {
                toast.error(serverErrorMsg);
                console.error(result.error.detail);
                return;
            }
            setUpdateData(result.data);
            setHideForm(false);
            setHideEdit(false);
            setUpdateId(id);
        })
    }
    function eliminar(id: string) {
        confirm(deleteConfirm) ?
            API.delete(ENDPOINT, id).then((res) => {
                if (res && res.error) {
                    toast.error(res.error.detail);
                    console.error(res.error.detail);
                }
                else {
                    toast.success(deleteMsg)
                    if (toggleSearch) searchWith('agregarForm');
                    else getRegistros();
                }
            }) : -1;
    }
    function agregar(data: { [x: string]: any }) {

        API.post(ENDPOINT, data).then(msg => {
            if (msg.error) {
                toast.error(serverErrorMsg);
                console.error(msg.error);
                return;
            }
            console.log('Lograo', postMsg)
            toast.success(postMsg)
            if (toggleSearch) searchWith('agregarForm');
            else getRegistros();
        })
    }
    function actualizar(data: { [x: string]: any }) {
        if (updateId == null) return;
        API.update(ENDPOINT, updateId, data).then(msg => {
            if (msg.error) {
                toast.error(serverErrorMsg);
                console.error(msg.error);
                return;
            }
            toast.success(putMsg)
            if (toggleSearch) searchWith('agregarForm');
            else getRegistros();
        })
    }
    function searchWith(formId: string) {
        const form = document.getElementById(formId) as HTMLFormElement;
        const data = clearPrefix(Object.fromEntries(new FormData(form).entries()));
        getRegistros(data);
    }
    async function getRegistros(filtros: { [x: string]: any } = {}) {
        API.get(ENDPOINT, filtros).then(regs => {
            setTableData(regs.data);
        });

    }
    function ontoggle(state: boolean) {
        setToggleSearch(state);
        if (!state) getRegistros();
        else searchWith('agregarForm');
    }

    useEffect(() => {
        if (!API.accessToken) return;
        console.log('AUTH TOKEN: ', API.accessToken)
        getRegistros();
    }, [API.accessToken])
    return (
        <div className="app-shell">

            <Navigation includeSidebar={true}>
                <Nav>
                <Nav.Link href="#top">Inicio</Nav.Link>
                <Nav.Link href="/colectas">Colectas</Nav.Link>
                </Nav>
            </Navigation>
            <Breadcrumb path="/colectas/eventos" />

            <main className="page-content">
                <div className="content-row">

                    <EventoForm title={formPostInfo.title} subtitle={formPostInfo.subtitle} id="agregarForm" onSubmit={agregar} autofill={{}} onchange={() => {
                        console.log(toggleSearch)
                        if (!toggleSearch) return;
                        searchWith('agregarForm')
                    }} />

                    <div className="table-panel">
                        <Tabler onSearchToggle={ontoggle} data={tableData} columns={tableColumns} columNames={tableColumnNames} primaryField="id"
                            onDelete={eliminar} onDetail={detalles} onEdit={setModal} headerData={tableHeader} />

                    </div>
                </div>
                <hr />
                <div className="content-row">
                    <EventoForm closable={true} setHidden={setHideEdit} title={formPutInfo.title} subtitle={formPutInfo.subtitle} id="editarForm" onSubmit={actualizar} autofill={updateData} hidden={hideEdit} />
                </div>
                <hr />
                <div className="content-row">
                    <DetallerPanel id="detalle" headerInfo={detailHeader} hidden={hideDetail} setHidden={setHideDetail}>
                        {detailData == null ? (
                            <div className="form-row">
                                <p className="panel-title" style={{ color: 'var(--text-muted)' }}>{detailError}</p>
                            </div>
                        ) : (
                            <DetallerFields data={detailData} labelSchema={labels} layout={[['id', 'nombre'], ['fecha_inicio', 'fecha_fin', 'tipo'], ['descripcion']]}></DetallerFields>
                        )}
                    </DetallerPanel>
                </div>
            </main>
        </div>
    );
}