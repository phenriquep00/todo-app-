import { User } from '../../utils/interfaces'
import { useState } from 'react'
import { SideBarVisible } from './SideBarVisible'
import { List } from 'phosphor-react'

export interface SideBarProps {
    user: User
}

interface SideBarOpenProps extends SideBarProps {
    setIsSideBarOpen: (isSideBarOpen: boolean) => void
    setContent: (content: string) => void
}

export function SideBar({ user, setIsSideBarOpen, setContent }: SideBarOpenProps) {
    const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(true)

    const setSideBarVisibilty = () => {
        setIsSideBarVisible(!isSideBarVisible)
        setIsSideBarOpen(!isSideBarVisible)
    }

    return (
        <div className={`${isSideBarVisible ? "w-[calc(100vw-75vw)]" : ""} h-full flex items-center`}>
            {
                isSideBarVisible ?
                <SideBarVisible user={user} setIsSideBarVisible={setSideBarVisibilty} setContent={setContent} />
                : <div className="h-full relative">
                    <List size={24} weight="bold" onClick={setSideBarVisibilty} className="cursor-pointer absolute m-[calc(2.5vh+16px)]" />
                </div>
            }
        </div>
    )
}
