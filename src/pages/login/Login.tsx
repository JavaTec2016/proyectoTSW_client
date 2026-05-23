import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
    const { login } = useAuth();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const msg = await login({username:user, password:pass})
        if(msg.error){
            console.error(msg.error)
            toast.error(msg.error.detail);
            return;
        }
        toast.success('Bienvenido: ' + user);
        navigate('/colectas/categorias');
    }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
                <input type="submit" value="Ingresar" className="btn btn-primary full-width w-100"/>
            </form>
            <br />
            <hr />
            <span className='text-center'>No tiene una cuenta? <a href="/registrar">Registrese</a></span>
        </div>
    </div>
  )
}