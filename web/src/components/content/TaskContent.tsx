import { User } from '../../utils/interfaces'
import { StickyContent } from './StickyContent'

interface TaskContentProps {
    user: User
    type: string
}

export function TaskContent({ user, type }: TaskContentProps) {
    return (
        <main className="w-full h-full">
            {
                type == 'upcoming' ?
                'upcoming'
                : type == 'today' ?
                'today'
                : type == 'calendar' ?
                'calendar'
                : type == 'sticky' ?
                <StickyContent user={user} />
                : 'meu bacano'
            }
        </main>
    )
}
