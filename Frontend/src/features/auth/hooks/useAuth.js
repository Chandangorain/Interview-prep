import { useContext, useEffect } from "react";  // this is the hook layer , we will use this hook to access the auth context in any component of the app and also to perform side effects related to authentication like checking if the user is logged in or not and also to set the user data in the context when the user logs in or registers.
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";


export const useAuth = () => {

  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context

   const handleLogin = async ({ email, password }) => {     // how login is handled in the app, we will call this function from the login page and pass the email and password entered by the user and this function will call the login api and set the user data in the context if the login is successful and also set the loading state to true while the login request is being processed and set it to false once the request is completed.
        setLoading(true)
        try {
            const data = await login({ email, password })  //api call from auth.api.js
            setUser(data.user)      // this is the userdata which we get from backend (auth.controller.js) after successful login and we set that user data in the context .
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)       // in logout no need to handle userdata , so null
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
}