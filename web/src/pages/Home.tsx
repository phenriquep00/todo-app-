import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../utils/interfaces'
import axios from 'axios'
import { SideBar } from '../components/sidebar/SideBar'
import { Loading } from '../components/Loading'
import { Content } from '../components/content/Content'

export function Home() {
    const [user, setUser] = useState<User>({} as User)
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true)
    const [content, setContent] = useState<string>('')

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/')
        } else {
            getUserInfo()
        }
    }, [])

    useEffect(() => {
        document.title = `ToDo App - ${user.name}`
    }, [user.name])

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/user/${userId}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
        
    return (
        <main className="w-screen h-screen flex">
            {
                user ?
                <>
                    <SideBar user={user} setIsSideBarOpen={setIsSideBarOpen} setContent={setContent} />
                    <Content user={user} isSideBarOpen={isSideBarOpen} contentSelected={content} />
                </>
                : <Loading />
            }
        </main>
    )
}
