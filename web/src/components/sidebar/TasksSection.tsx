import { Calendar, CaretDoubleRight, ListChecks, NoteBlank } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Task, User } from '../../utils/interfaces'
import axios from 'axios'

interface TasksSectionProps {
    user: User
    contentSelectedId: string | null
    setContentSelectedId: (name: string) => void
}

export function TasksSection({ user, contentSelectedId, setContentSelectedId }: TasksSectionProps) {
    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
    const [todayTasks, setTodayTasks] = useState<Task[]>([])

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            handleGetUpcomingAndTodayTasks()
        }
    }, [user])

    const handleGetUpcomingAndTodayTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/tasks/manager/${user.id}`)
            setUpcomingTasks(response.data.upcomingTasks)
            setTodayTasks(response.data.todayTasks)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="w-[calc(100%-32px)] mb-4 ml-4 flex flex-col gap-2 pb-4 border-b">
            <h2 className="font-fredoka text-sm">TASKS</h2>
            <div className="w-full flex flex-col gap-1">
                <div onClick={() => setContentSelectedId('task upcoming')} className={`${contentSelectedId === 'task upcoming' ? "bg-slate-300 font-bold" : "hover:bg-slate-200"} w-full flex items-center justify-between py-1 rounded pl-1 cursor-pointer text-slate-800 text-sm`}>
                    <div className="flex gap-2 items-center">
                        <CaretDoubleRight size={20} weight="bold" />
                        <span className="text-sm">Upcoming</span>
                    </div>
                    <div className="w-6 h-[18px] mr-1 flex items-center justify-center bg-slate-200 rounded">
                        <span>{upcomingTasks.length}</span>
                    </div>
                </div>
                <div onClick={() => setContentSelectedId('task today')} className={`${contentSelectedId === 'task today' ? "bg-slate-300 font-bold" : "hover:bg-slate-200"} w-full flex items-center py-1 justify-between rounded pl-1 cursor-pointer text-slate-800 text-sm`}>
                <div className="flex gap-2 items-center">
                        <ListChecks size={20} weight="bold" />
                        <span className="text-sm">Today</span>
                    </div>
                    <div className="w-6 h-[18px] mr-1 flex items-center justify-center bg-slate-200 rounded">
                        <span>{todayTasks.length}</span>
                    </div>
                </div>
                <div onClick={() => setContentSelectedId('task calendar')} className={`${contentSelectedId === 'task calendar' ? "bg-slate-300 font-bold" : "hover:bg-slate-200"} w-full flex items-center gap-2 py-1 rounded pl-1 cursor-pointer text-slate-800`}>
                    <Calendar size={20} weight="bold" />
                    <span className="text-sm">Calendar</span>
                </div>
                <div onClick={() => setContentSelectedId('task sticky')} className={`${contentSelectedId === 'task sticky' ? "bg-slate-300 font-bold" : "hover:bg-slate-200"} w-full flex items-center gap-2 py-1 rounded pl-1 cursor-pointer text-slate-800`}>
                    <NoteBlank size={20} weight="bold" />
                    <span className="text-sm">Sticky Wall</span>
                </div>
            </div>
        </section>
    )
}
