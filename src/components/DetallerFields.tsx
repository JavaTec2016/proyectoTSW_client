import React from 'react'

function DetallerFields({ data, labelSchema, layout }: { data: { [x: string]: any }, labelSchema: { [x: string]: string }, layout: string[][] }) {
  return (
    <>
      {layout.map((row, idx) => (
        <div key={idx} className='form-row'>
          <div className="navbar-divider"></div>
          {row.map(field => (
            <div key={field} className='d-flex w-100'>
              <div className='form-group'>
                <div className='d-flex'>
                  <p className="panel-title me-1">{labelSchema[field]}: </p> <p className="ms-1">{data[field]}</p>
                </div>
              </div>
              <div className="navbar-divider"></div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default DetallerFields