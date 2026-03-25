import { createContext,useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

 


    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}
  //this authprovider will be used to wrap the entire app in app.jsx so that we can access the auth context in any component of the app without having to pass props down manually at every level.