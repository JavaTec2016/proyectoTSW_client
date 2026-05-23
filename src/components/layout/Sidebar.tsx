import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
export type SideSection = {
    [x:string]: any,
    section:string,
    items:{
        [x:string]: any,
        to:string,
        label:string,
        icon:string
    }[]

}
const navItems:SideSection[] = [
    {section: 'Panel administrador', items:[
        {'to':'/admin/dashboard', label:'Dashboard', icon:'ti-layout'}
    ]},
    {section: 'Acciones', items:[
        {'to':'/colectas/categorias', label:'Categorias', icon:'si'},
        {'to':'/colectas/corporaciones', label:'Corporaciones', icon:'si'},
        {'to':'/colectas/eventos', label:'Eventos', icon:'si'}
    ]}
]
function Sidebar({collapsed, layout=navItems}:{collapsed:boolean, layout?:SideSection[]}) {
    const {user, role, logout} = useAuth();
    const navigate = useNavigate();

     layout = layout.filter(sect=>{return sect.section != 'Panel administrador' || (sect.section == 'Panel administrador' && role == 'admin')})
    console.log(layout)
    if(!user) return<></>
  return (
    <aside style={{width: '100%', height:'100%'}} className="sidebar">
        <div className="sidebar-header">
            <div className="d-flex justify-content-between w-100">
                <span style={{ color: '#fff', fontWeight: 500, whiteSpace: 'nowrap', fontSize:'20px' }} className="ms-4">Ajustes</span>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            

            
        </div>

        <nav>
            <div className=" d-flex justify-content-center">
                <img src= "/public/assets/img/profile.webp" alt="" width={'50%'}/>
            </div>
            <div className="d-flex w-100 justify-content-center align-items-center gap-2">
                <p className="fs-2">{user}</p>
                <button onClick={async()=>{await logout(); navigate('/login')}} className="btn btn-outline-danger h-100">Cerrar Sesion</button>
            </div>
            {layout.map(group=> (
                <div key={group.section} className="px-4">
                    {!collapsed && (
                        <div className="sidebar-section">
                            {group.section}
                        </div>
                    )}
                    {group.items.map(item => (
                        <NavLink key={item.to} to={item.to} className={'sidebar-item ' + (({isActive}:{isActive:boolean})=> isActive ? 'sidebar-item-active' : '')} >
                            <i className={`ti ${item.icon}`} style={{ fontSize: 18, flexShrink: 0 }} />
                            {!collapsed && <span style={{ fontSize: 13 }}>{item.label}</span>}
                        </NavLink>
                    ))}
                </div>
            ))}
        </nav>
    </aside>
  )
}

export default Sidebar