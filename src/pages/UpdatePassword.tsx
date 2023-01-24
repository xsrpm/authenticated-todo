import {useRef} from 'react'
import { useAuth } from '../components/Auth/AuthContext';

export function UpdatePassword(){
    const auth = useAuth()
    const buttonRef = useRef(null)    
    return(
        <>
        <h1>Update Password</h1>
        <h2>Enter a new password</h2>
        <form onSubmit={async (event: React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault()
            const [password] = event.target as any
            console.log(password.value)
            await auth.updatePassword(password.value);
            ((buttonRef.current as unknown) as HTMLInputElement).disabled = true;
            alert("Password actualizado")

        }}>
            <input type="password" placeholder='New password'/>
            <input type="password" placeholder='Confirm new password'/>
            <input type="submit" value="Reset Password" ref={buttonRef}/>
        </form>
        </>
    )
}