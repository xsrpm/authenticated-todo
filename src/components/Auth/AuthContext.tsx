import * as React from 'react';

import { supabase } from '../../backend/supabase';


type AuthContextType =  {
  getUser: ()=>any,
  signIn: (user: User, callback: VoidFunction) => void,
  signOut: (callback: VoidFunction) => void,
  signUp: (user: User, callback: VoidFunction) => void,
}

type User = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let signIn = async ({email,password}: User, callback: VoidFunction) => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password
    })
    // console.log("user ", user)
    // console.log("session ", session)
    if(user){
      // setUser({ email, password })
      callback();
    } 
    else console.log(error)  
  };

  let signOut = async (callback: VoidFunction) => {
    const { error } = await supabase.auth.signOut()
    if(!error){
     // setUser(null);
      callback()
    }
    else console.log(error)  

  };

  let signUp = async ({ email, password, firstName, lastName}: User, callback: VoidFunction) => {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: {
          firstName,
          lastName
        },
      }
    )
    // console.log("user ", user)
    // console.log("session ", session)
    if(user){
      //setUser({email,password,firstName,lastName});
      callback();
    } 
    else console.log(error)  
  }

  let getUser = ()=> supabase.auth.user();

  let value = { getUser, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
    return React.useContext(AuthContext);
  }
  