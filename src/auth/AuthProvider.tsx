import * as React from 'react';
import { supabase } from '../backend/supabase';
import { AuthContext } from './AuthContext';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  // let [user, setUser] = React.useState<User | null>(null);

  let signIn = async ({email,password}: User, callback: VoidFunction) => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password
    })
    console.log("user ", user)
    console.log("session ", session)
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
    console.log("user ", user)
    console.log("session ", session)
    if(user){
      //setUser({email,password,firstName,lastName});
      callback();
    } 
    else console.log(error)  
  }

  let user = supabase.auth.user();



  let value = { user, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export interface AuthContextType {
  user: any,
  signIn: (user: User, callback: VoidFunction) => void,
  signOut: (callback: VoidFunction) => void,
  signUp: (user: User, callback: VoidFunction) => void,
}

export type User = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}