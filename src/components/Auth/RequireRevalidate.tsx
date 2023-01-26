import {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function RequireRevalidate({ children }: { children: JSX.Element }){
    const navigate = useNavigate()
    const {getUser} = useAuth()
    const user = getUser()
    
    useEffect(()=>{
        setTimeout(()=>{
            if(!user) navigate("/signin")
        }, 2000)
    },[])
    
    if(!user) return <h1>Loading</h1>
    
    return children;
}