import { Plus } from 'phosphor-react'
import { Tasklist, User } from '../../utils/interfaces'
import { TasklistCard } from './TasklistCard'
import { FormEvent, useRef, useState } from 'react'
import axios from 'axios'

interface TasklistSectionProps {
    user: User
    tasklists: Tasklist[]
    setTasklists: (tasklists: Tasklist[]) => void
    contentSelectedId: string | null
    setContentSelectedId: (tasklistId: string) => void
}

export function TasklistsSection({ user, tasklists, setTasklists, contentSelectedId, setContentSelectedId }: TasklistSectionProps) {
    const [tasklistName, setTasklistName] = useState<string>('')
    
    const inputRefAddTasklist = useRef<HTMLInputElement | null>(null)

    const handleInputAddTasklistFocus = () => {
        if (inputRefAddTasklist.current) {
            inputRefAddTasklist.current.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            handleCreateTasklist(e)
        }
    }

    const handleCreateTasklist = async (e: FormEvent) => {
        e.preventDefault()

        const color = `#${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`

        try {
            const response = await axios.post('http://localhost:3333/tasklist', {
                name: tasklistName,
                color,
                userId: user.id
            })
            setTasklists([...tasklists, response.data])
            setTasklistName('')
            setContentSelectedId(`list ${response.data.id}`)
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <section className="w-[calc(100%-32px)] ml-4 flex flex-col gap-2 pb-4 border-b">
            <h2 className="font-fredoka text-sm">LISTS</h2>
            <div className="w-[calc(100%+8px)] max-h-[88px] flex flex-col gap-2 pr-2 overflow-x-hidden overflow-y-auto scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin">
                {
                    tasklists && tasklists.map((tasklist: Tasklist) => {
                        return (
                            <TasklistCard key={tasklist.id} tasklist={tasklist} isSelected={`list ${tasklist.id}` === contentSelectedId} onClick={() => setContentSelectedId(`list ${tasklist.id}`)} />
                        )
                    }) 
                }
            </div>
            <form onSubmit={handleCreateTasklist} className="w-full h-8 pl-4 flex items-center gap-2 bg-white">
                <Plus weight="bold" onClick={handleInputAddTasklistFocus} className="text-slate-800 rounded" />
                <input value={tasklistName} onChange={e => setTasklistName(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder="Add a new List" ref={inputRefAddTasklist} className="w-full pr-2 focus:outline-none" />
            </form>
        </section>
    )
}
