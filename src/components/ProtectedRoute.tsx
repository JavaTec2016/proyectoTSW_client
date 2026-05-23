import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "./LoadingScreen";

export default function ProtectedRoute() {
    const {accessToken, isLoading} = useAuth();
    if(isLoading) return <LoadingScreen />
    if(!accessToken) return <Navigate to='/login' replace />
  return <Outlet />
}
