import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function RequireRevalidate({ children }: { children: JSX.Element }){
    const navigate = useNavigate()
    const {getUser} = useAuth()
    
    useEffect(()=>{
        setTimeout(()=>{
            if(!getUser()) navigate("/signin")
        }, 2000)
    },[])
    
    if(!getUser()) return <h1>Loading</h1>
    
    return children;
}