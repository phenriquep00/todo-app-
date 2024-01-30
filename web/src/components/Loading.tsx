import { CircleNotch } from 'phosphor-react'

export function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <CircleNotch size={28} weight="bold" className="animate-spin" />
        </div>
    )
}
