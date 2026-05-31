import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ReactDOM from 'react-dom'
export default function Login() {
    const { login } = useAuth();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const recaptcharef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    useEffect(()=>{
        const rendercaptcha = () =>{
            if(recaptcharef.current && widgetIdRef.current === null){
                widgetIdRef.current = window.grecaptcha.enterprise.render(
                    recaptcharef.current,
                    {
                        sitekey: '6LcA3gUtAAAAAOiO33F4VHU4YK-Y5vcqQnCLyttZ',
                        action: 'LOGIN'
                    }
                )
            }
        };
        //rendereo a manota
        if(window.grecaptcha?.enterprise) {
            window.grecaptcha.enterprise.ready(rendercaptcha)
        } else {
            const interval = setInterval(()=>{
                if(window.grecaptcha?.enterprise) {
                    window.grecaptcha.enterprise.ready(rendercaptcha)
                    clearInterval(interval)
                }
            }, 100)
        }


    }, [])

    const navigate = useNavigate();
    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        (document.getElementById('btnIngresar') as HTMLInputElement).value = 'Autenticando...'
        const grecaptchaToken = window.grecaptcha.enterprise.getResponse(
            widgetIdRef.current ?? undefined
        )
        if(!grecaptchaToken && false){
            toast.error('Complete el captcha');
            (document.getElementById('btnIngresar') as HTMLInputElement).value = 'Ingresar'
            return;
        }

        const msg = await login({username:user, password:pass, grecaptchatoken:grecaptchaToken})
        if(msg.error){
            console.error(msg.error)
            toast.error(msg.error.detail);
            (document.getElementById('btnIngresar') as HTMLInputElement).value = 'Ingresar'
            return;
        }
        toast.success('Bienvenido: ' + user);
        (document.getElementById('btnIngresar') as HTMLInputElement).value = 'Ingresar'
        navigate('/colectas/categorias');
    }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        {ReactDOM.createPortal(<script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>, document.head)}
        <div className="card shadow p-4" style={{width: "100%", maxWidth:"400px"}}>
            
            <form method="post" role="form" onSubmit={handleSubmit}>
              
                <h2 className="text-center mb-4"> Inicie sesion</h2>
        
                    <div className="mb-3">
                    <label className='form-label' htmlFor="">Usuario: </label>
                    <input className='form-control' type="text" name='usuario' id='usuario' value={user} onChange={e => setUser(e.target.value)} placeholder='Nombre de usuario' />
                    <label className='form-label' htmlFor="">Contraseña: </label>
                    <input className='form-control' type="password" name='password' id='password' value={pass} onChange={e => setPass(e.target.value)} placeholder='Contraseña'  />
                    </div>
                    <br />
                    <div ref={recaptcharef} className='mb-3'></div>
                <input type="submit" value="Ingresar" className="btn btn-primary full-width w-100" id='btnIngresar'/>
            </form>
            <br />
            <hr />
            <span className='text-center'>No tiene una cuenta? <a href="/registrar">Registrese</a></span>
        </div>
    </div>
  )
}