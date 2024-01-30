import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../utils/interfaces'

export function Login() {
    const [user, setUser] = useState<User>({} as User)

    const clientId = '736036110168-rn4d1t5jk64carrv4f7eot3q7hkskbtj.apps.googleusercontent.com'
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('userId')
        document.title = 'ToDo App - Login'
    }, [])

    useEffect(() => {
        if (user.id) {
            localStorage.setItem('userId', user.id)
            navigate('/home')
        }
    }, [user.id, navigate])
    
    const onSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const decoded: User = jwtDecode(credentialResponse.credential)
            
            try {
                const response = await axios.post('http://localhost:3333/login', {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture
                })
                setUser(response.data)                
            } catch (error) {
               console.log(error) 
            }
        }
    }

    const onError = () => {
        console.log('Login failed')
    }

    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin onSuccess={credentialResponse => onSuccess(credentialResponse)} onError={onError} />
            </GoogleOAuthProvider>
        </main>
    )
}
