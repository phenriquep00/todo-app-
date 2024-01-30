import { Tag } from '../../utils/interfaces'

interface TagCardProps {
    tag: Tag
    setContentSelectedId: (id: string) => void
}

export function TagCard({ tag, setContentSelectedId }: TagCardProps) {
    const tagColor = `${tag.color}`

    return (
        <div onClick={() => setContentSelectedId(tag.id)} style={{ backgroundColor: tagColor }} className="w-20 h-10 flex items-center justify-center py-1 rounded cursor-pointer">
            <span className="text-slate-800 font-semibold">{tag.name}</span>
        </div>
    )
}
