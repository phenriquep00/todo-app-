import { Tasklist } from '../../utils/interfaces'

interface TasklistCardProps {
    tasklist: Tasklist
    isSelected: boolean
    onClick: () => void
}

export function TasklistCard({ tasklist, isSelected, onClick }: TasklistCardProps) {
    const tasklistColor = `${tasklist.color}`

    return (
        <div onClick={onClick} className={`${isSelected ? "bg-slate-300 font-bold" : "hover:bg-slate-200"} p-1 rounded flex items-center justify-between text-sm cursor-pointer text-slate-800`}>
            <div className="flex items-center gap-2">
                <div style={{ backgroundColor: tasklistColor }} className={`w-[18px] h-[18px] rounded`} />
                <span>{tasklist.name}</span>
            </div>
            <div className="w-6 h-[18px] flex items-center justify-center bg-slate-200 rounded">
                <span>{tasklist.tasks ? tasklist.tasks.length : 0}</span>
            </div>
        </div>
    )
}
