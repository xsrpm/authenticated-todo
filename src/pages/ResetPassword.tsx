import { useAuth } from '../components/Auth/AuthContext';

export function ResetPassword(){
    const auth = useAuth()
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>)=>{

    }
    return (<>
        <h1>Forgot your password?</h1>
        <h2>You can reset your password here.</h2>
        <form onSubmit={async (event)=>{
            event.preventDefault()
            const [email] = event.target as any
            console.log(email.value)
            await auth.resetPasswordForEmail(email.value)
}}>
        <input type="email" placeholder="Enter your email" />
        <input type="submit" value="Reset password" />
        </form>
    </>)
}