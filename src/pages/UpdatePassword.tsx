export function UpdatePassword(){
    return(
        <>
        <h1>Update Password</h1>
        <h2>Enter a new password</h2>
        <form onSubmit={()=>{
            
        }}>
            <input type="password" placeholder='New password'/>
            <input type="password" placeholder='Confirm new password'/>
            <input type="submit" value="Reset Password"/>
        </form>
        </>
    )
}