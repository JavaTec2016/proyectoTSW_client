import React, { useEffect, useState } from 'react'

function DetallerPanel({id, headerInfo, hidden=true, setHidden, children}:{headerInfo:{[x:string]:any, title:string, subtitle:string}, hidden?:boolean, setHidden:(a:boolean)=>any, children?:React.ReactNode, id?:string}) {
  return (
    <div id={id} className='form-panel' style={{minWidth:'100%', maxHeight:'100vh'}} hidden={hidden}>
        <div className="panel-header d-flex justify-content-between">
          <div>
            <p className="panel-title">{headerInfo.title}</p>
            <p className="panel-subtitle">{headerInfo.subtitle}</p>
          </div>
          <button className='btn panel-close' onClick={()=>{setHidden(true)}}>X</button>
        </div>
        
        <div className="panel-divider" style={{marginLeft:'-0.5rem', marginRight:'-0.5rem'}}></div>
        <div className='form-scroll' style={{paddingLeft:'5%', paddingRight:'5%'}}>
          {children}
        </div>
        
    </div>
  )
}

export default DetallerPanel