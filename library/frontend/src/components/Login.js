import React,{useState,useEffect} from 'react'
import {LOG_IN} from '../queries'
import {useMutation} from '@apollo/client'

const Login = ({show,setToken}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOG_IN, {
        onError: (error) => {
            //setError(error.graphQLErrors[0].message)
            console.log(error)
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token',token)
        }
    }, [result.data])// eslint-disable-line

    const handleSubmit =async(e)=>{
        e.preventDefault()
        await login({variables:{username,password}})
        console.log('Logged in')
        setUsername('')
        setPassword('')
    }

    if (!show) {
        return null
    }
    
    return (
        <div>
           <br/>
           <h2>Login</h2>
           <form onSubmit={handleSubmit}>
            
            <label>username</label>
            <input type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <br/>
            <label>password</label>
            <input type='password' name ='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <br/>
            <button type='submit'>login</button>
        </form>  
        </div>
       
    )
}

export default Login
