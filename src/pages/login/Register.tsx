import React, { useState } from 'react'
import API from '../../api/api';

function Register() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [touched, setTouched] = useState(false);
    const [passMatch, setPassMatch] = useState(false);
    const [passError, setPassError] = useState('Las contraseñas no coinciden');
    const [errored, setErrored] = useState(false);
    function matchPass(matched:string){
        setPassError('Las contraseñas no coinciden')
        setTouched(true);
        setErrored(false);
        setPassMatch(pass == matched);
        console.log(pass, matched, pass == matched)
    }
    async function submit(e:React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if(!passMatch) return;

        let res = await API.register({username:user, password:pass})
        if(res.error){
            setErrored(true);
            alert('Error: ' + res.error.detail)
            const err = (res.error as any).password[0];
            console.log(err)
            setPassError(err);
        }else {
            setErrored(false);
            alert('Registrado exitosamente, puede iniciar sesion')

        }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{width: "100%", maxWidth:"400px"}}>
            
            <form method="post" role="form" onSubmit={submit}>
              
                <h2 className="text-center mb-4"> Inicie sesion</h2>
        
                    <div className="mb-3">
                    <label className='form-label' htmlFor="usuario">Usuario: </label>
                    <input className='form-control' type="text" name='usuario' id='usuario' value={user} onChange={e => setUser(e.target.value)} placeholder='Nombre de usuario'  />
                    <label className='form-label'  htmlFor="password">Contraseña: </label>
                    <input className='form-control'  type="text" name='password' id='password' value={pass} onChange={e => setPass(e.target.value)} placeholder='Contraseña'  />
                    <label className='form-label'  htmlFor="passwordConfirm">Confirmar contraseña: </label>
                    <input className='form-control'  type="text" name='passwordConfirm' id='passwordConfirm' onInput={e => matchPass(e.currentTarget.value)} placeholder='Confirmar' />
                    {(!passMatch || errored) && touched && (<p className='text-danger'>{passError}</p>)}
                    </div>
                    <br />
                <input type="submit" value="Registrarse" className="btn btn-primary full-width w-100"/>
            </form>
            <br />
            <hr />
            <span className='text-center'>Ya tiene una cuenta? <a href="/login">Inicie sesion</a></span>
        </div>
    </div>
  )
}

export default Register