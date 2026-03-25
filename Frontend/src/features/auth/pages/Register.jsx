import React ,{useState}from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const[username,setUsername]=useState("")  // this is two-way-binding . another part is onChange={(e)=>{setUsername(e.target.value)}} in username ,e mail, passowrd container in this code
    const[email,setEmail]=useState("")      //username → stores current input value setUsername() → updates that value
    const[password,setPassword]=useState("")

    const{loading,handleRegister}=useAuth()     //get loading , handleRegister from the useAuth() hook

      const handleSubmit =  async (e) => {  // when user clicks register button
        e.preventDefault()      // should not refresh page
        await handleRegister({username,email,password}) // send user,email,pass to useAuth
        navigate("/")       // redirect to home pge
    }

    if(loading){
        return(<main><h1>Loading..</h1></main>)
    }

  return (
     <main>
            <div className="form-container">
                <h1>Register</h1>
               <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        onChange={(e)=>{setUsername(e.target.value)}}  // two way binding whenever user types something update username state with that value
                        
                        type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button' >Register</button>

                </form>
                
                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
  )
}

export default Register
