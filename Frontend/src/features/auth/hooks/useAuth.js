import { useContext, useEffect } from "react";  // this is the hook layer , we will use this hook to access the auth context in any component of the app and also to perform side effects related to authentication like checking if the user is logged in or not and also to set the user data in the context when the user logs in or registers.
import { AuthContext } from "../auth.context";


export const useAuth = () => {

  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context


}