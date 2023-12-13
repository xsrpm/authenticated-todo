import * as React from "react";

import { supabase } from "../../backend/supabase";

type ResponseSignIn = {
  data?: any;
  messageError?: string;
};

type AuthContextType = {
  getUser: () => any;
  signIn: (user: User) => Promise<ResponseSignIn>;
  signOut: (callback: VoidFunction) => void;
  signUp: (user: User, callback: VoidFunction) => void;
  resetPasswordForEmail: (email: string) => void;
  updatePassword: (password: string) => void
};

type User = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {

  let signIn = async ({ email, password }: User) => {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    // console.log(user, error);
    return { data: user, messageError: error?.message };
  };

  let signOut = async (callback: VoidFunction) => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // setUser(null);
      callback();
    } else console.log(error);
  };

  let signUp = async (
    { email, password, firstName, lastName }: User,
    callback: VoidFunction
  ) => {
    const { user, session, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: {
          firstName,
          lastName,
        },
      }
    );
    // console.log("user ", user)
    // console.log("session ", session)
    if (user) {
      //setUser({email,password,firstName,lastName});
      callback();
    } else console.log(error);
  };

  let resetPasswordForEmail = async (email: string)=> {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^\/\n]+)/i
    const redirectUrl = `${( window.location.toString().match(regex) as Array<string>)[0]}/update-password`
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email,
      { redirectTo: redirectUrl })
    if(data){
      console.log(`redirect url ${redirectUrl}`)
    }
    else console.log(error)
  }

  let getUser = () => supabase.auth.user();

  let updatePassword = async (password: string)=> {
    const { user, error } = await supabase.auth.update({password})
    if(user){
      console.log(user)
    }
    else console.log(error)
  }

  let value: AuthContextType = { getUser, signIn, signOut, signUp, resetPasswordForEmail, updatePassword };

  supabase.auth.onAuthStateChange((event : string, session: any) => {
    console.log(event, session)
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}
