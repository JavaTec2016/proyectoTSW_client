import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Donador_CategoriasPage } from './pages/Donador_CategoriasPage'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CorporacionesPage } from './pages/CorporacionesPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import { EventosPage } from './pages/EventosPage';
import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import DonadoresPage from './pages/DonadoresPage';
const router = createBrowserRouter([
  //rutas token
  {
    path:'/colectas',
    element: <ProtectedRoute />,
    children:[
      {path:'categorias', element:<Donador_CategoriasPage />},
      {path:'corporaciones', element:<CorporacionesPage />},
      {path:'eventos', element:<EventosPage />},
      {path:'donadores', element:<DonadoresPage />},
    ]
  },
  {
    path:'/admin', element:<ProtectedRoute />,
    children:[
      {path:'dashboard', element:<Dashboard />}
    ]
  },
  //rutas publicas
  {path:'/', element:<LandingPage />},
  {path: '/login', element: <Login/>},
  {path: '/registrar', element: <Register/>},
  {path:'*', element: <Navigate to='/' replace />}
])
function App() {
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
    </AuthProvider>
  );
}

export default App