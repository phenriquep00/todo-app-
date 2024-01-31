import { useEffect, useState } from 'react'
import { Sticky, User } from '../../utils/interfaces'
import { Plus } from 'phosphor-react'
import { StickyCard } from './StickyCard'
import axios from 'axios'

interface StickyContentProps {
    user: User
}

export function StickyContent({ user }: StickyContentProps) {
    const [stickys, setStickys] = useState<Sticky[]>([]);

    useEffect(() => {
        handleGetStickys()
    }, [user.stickys])

    const handleCreateSticky = async () => {
        const color = `#${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`

        try {
            const response = await axios.post('http://localhost:3333/sticky', {
                title: 'Sticky Title',
                description: 'Sticky Description',
                color,
                userId: user.id
            })
            setStickys([...stickys, response.data])
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetStickys = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/stickys/${user.id}`)
            setStickys(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-[calc(100%-2px)] flex flex-col p-4">
            <header className="h-24 flex items-center">
                <h1 className="font-fredoka text-4xl">Sticky Wall</h1>
            </header>
            <section className="bg-black h-[calc(100vh-96px)] flex flex-wrap gap-3 p-8 rounded border overflow-x-hidden overflow-y-auto scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin">
                {
                    stickys && stickys.map((sticky: Sticky) => {
                        return (
                            <StickyCard 
                                key={sticky.id} 
                                sticky={sticky} 
                                updateStickys={handleGetStickys} 
                            />
                        )
                    })
                }
                <div onClick={handleCreateSticky} className="w-64 h-64 flex items-center justify-center bg-slate-300 cursor-pointer rounded">
                    <Plus size={40} weight="bold" />
                </div>
            </section>
        </div>
    )
}
