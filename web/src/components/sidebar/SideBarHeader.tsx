import { List, MagnifyingGlass } from 'phosphor-react'
import { User } from '../../utils/interfaces'
import { useRef } from 'react'

interface SideBarHeaderProps {
    user: User
    setIsSideBarVisible: () => void
}

export function SideBarHeader({ user, setIsSideBarVisible }: SideBarHeaderProps) {
    const inputRefSearch = useRef<HTMLInputElement | null>(null)
    
    const handleInputSearchFocus = () => {
        if (inputRefSearch.current) {
            inputRefSearch.current.focus()
        }
    } 

    return (
        <header className="w-full flex flex-col justify-between gap-2 p-4 text-slate-800">
            <div className="flex items-center justify-between">
                <h1 className="font-fredoka text-lg">Welcome, {user.name}</h1>
                <List size={24} weight="bold" onClick={setIsSideBarVisible} className="cursor-pointer" />
            </div>
            <div className="w-full h-8 pl-4 flex items-center gap-2 bg-white">
                <MagnifyingGlass weight="bold" onClick={handleInputSearchFocus} className="text-slate-800 rounded" />
                <input type="text" placeholder="Search" ref={inputRefSearch} className="w-full pr-2 focus:outline-none" />
            </div>
        </header>
    )
}
