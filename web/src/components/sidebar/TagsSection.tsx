import { Plus } from 'phosphor-react'
import { Tag, User } from '../../utils/interfaces'
import { TagCard } from './TagCard'
import { FormEvent } from 'react'
import axios from 'axios'

interface TagsSectionProps {
    user: User
    tags: Tag[]
    setTags: (tags: Tag[]) => void
    setContentSelectedId: (id: string) => void
}

export function TagsSection({ user, tags, setTags, setContentSelectedId }: TagsSectionProps) {
    const handleCreateTag = async (e: FormEvent) => {
        e.preventDefault()

        const color = `#${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`
    
        try {
            const response = await axios.post('http://localhost:3333/tag', {
                name: `Tag ${tags.length + 1}`,
                color,
                userId: user.id
            })
            setTags([...tags, response.data])
            setContentSelectedId(`tag ${response.data.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="w-[calc(100%-32px)] ml-4 flex flex-col gap-2 py-4 border-b">
            <h2 className="font-fredoka text-sm">TAGS</h2>
            <form onSubmit={handleCreateTag} className="w-[calc(100%+8px)] max-h-24 flex flex-wrap gap-2 overflow-auto scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin">
                {
                    tags && tags.map((tag: Tag) => {
                        return (
                            <TagCard key={tag.id} tag={tag} setContentSelectedId={() => setContentSelectedId(`tag ${tag.id}`)} />
                        )
                    })
                }
                <button type="submit" className="w-24 h-10 flex items-center justify-center rounded gap-2 bg-slate-200">
                    <Plus weight="bold" />
                    <span className="text-slate-800 font-semibold">Add Tag</span>
                </button>
            </form>
        </section>
    )
}
