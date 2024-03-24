import { useContext, createContext , ReactNode, useEffect, useState} from "react";
import { GoogleAuthProvider, signInWithPopup,  onAuthStateChanged } from "firebase/auth";
import { Auth } from "./Auth";



const AuthContext= createContext<any>(null)

type AuthContextProviderProps = {
    children: ReactNode;
  };

export const AuthContextProvider=({ children }: AuthContextProviderProps)=>{
 const [user, setUser]= useState<any>(null)
    const googleSignin= ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(Auth, provider)
    }
  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(Auth, (currentUser)=>{
    setUser(currentUser);
   });
   return ()=>{
     unsubscribe();
   }
  },[])


  return(  <AuthContext.Provider value={{googleSignin, user}}>
        {children}
    </AuthContext.Provider>)
}


export const UserAuth=()=>{
    return useContext(AuthContext)
}