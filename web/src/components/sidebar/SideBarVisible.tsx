import { SideBarProps } from './SideBar'
import { useEffect, useState } from 'react'
import { Tag, Tasklist } from '../../utils/interfaces'
import { TagsSection } from './TagsSection'
import { SideBarFooter } from './SideBarFooter'
import { TasklistsSection } from './TasklistsSection'
import { SideBarHeader } from './SideBarHeader'
import { TasksSection } from './TasksSection'

interface SideBarVisibleProps extends SideBarProps {
    setIsSideBarVisible: () => void
    setContent: (content: string) => void
}

export function SideBarVisible({ user, setIsSideBarVisible, setContent }: SideBarVisibleProps) {
    const [tasklists, setTasklists] = useState<Tasklist[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [contentSelectedId, setContentSelectedId] = useState<string>('')

    useEffect(() => {
        if (user.tasklists) {
            setTasklists(user.tasklists)
        }
        if (user.tags) {
            setTags(user.tags)
        }
    }, [user])

    useEffect(() => {
        setContent(contentSelectedId)
    }, [contentSelectedId])

    return (
        <div className="w-full h-[95%] ml-4 bg-slate-100 rounded-xl">
            <SideBarHeader user={user} setIsSideBarVisible={setIsSideBarVisible}  />
            <TasksSection user={user} contentSelectedId={contentSelectedId} setContentSelectedId={setContentSelectedId} />
            <TasklistsSection user={user} tasklists={tasklists} setTasklists={setTasklists} contentSelectedId={contentSelectedId} setContentSelectedId={setContentSelectedId} />
            <TagsSection user={user} tags={tags} setTags={setTags} setContentSelectedId={setContentSelectedId} />
            <SideBarFooter />
        </div>
    )
}   
