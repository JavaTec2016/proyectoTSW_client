import { createContext, useState, useContext, useEffect, useRef } from "react";
import API from "../api/api";

type LoginContext = {
    user:string | null,
    role:string | null,
    accessToken: string | null,
    isLoading: boolean,
    login: (creds:{[x:string]:any, username:string, password:string}) => Promise<any>,
    logout: ()=> Promise<any>
}
const AuthContext = createContext<LoginContext | null>(null);
export function AuthProvider({children}:{children:React.ReactNode}){
    const [user, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    const startRefresh = () => {
        if(refreshInterval.current) clearInterval(refreshInterval.current)
        refreshInterval.current = setInterval(async()=>{
            await refreshAccessToken();
        }, 14 * 60 * 1000)
    }

    const refreshAccessToken = async () =>{
        try{
            const res = await API.refresh();
            setAccessToken(res.data.access)
            return res.data.access;
        }catch(e){
            //logout();
        }
    }
    const login = async(creds:{[x:string]:any, username:string, password:string}) => {
        const res = await API.login(creds);
        if(res.error) return res;
        setUser(creds.username);
        setRole(res.data.rol)
        setAccessToken(res.data!.access);
        startRefresh();
        return res;
    }

    const logout = async() => {
        if(refreshInterval.current) {
            clearInterval(refreshInterval.current)
            refreshInterval.current = null;
        }
        await API.logout();
        setAccessToken('');
        setUser(null);
        setRole(null);
    }

    useEffect(()=>{
       API.access(accessToken)
    }, [accessToken])
    useEffect(()=>{
        const restoreSession = async() =>{
            try{
                const res = await API.refresh();
                setAccessToken(res.data.access);
                setUser(res.data.username);
                setRole(res.data.rol)
                startRefresh();
            }catch {
                console.warn('No hay sesion')
            } finally {
                setIsLoading(false)
            }
        };
        restoreSession();
    }, [])

    return (
        <AuthContext.Provider value={{user, role, accessToken, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx 
}