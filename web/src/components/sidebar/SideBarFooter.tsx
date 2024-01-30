import { SignOut, SlidersHorizontal } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

export function SideBarFooter() {
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('userId')
        navigate('/')
    }

    return (
        <footer className="absolute bottom-4">
            <div className="flex flex-col p-4 gap-1 text-sm text-slate-800 font-semibold">
                <div className="flex items-center gap-2 cursor-pointer">
                    <SlidersHorizontal weight="bold" />
                    Settings
                </div>
                <div onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                    <SignOut weight="bold" />
                    Sign Out
                </div>
            </div>
        </footer>
    )
}
