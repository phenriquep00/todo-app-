import { User } from "../../utils/interfaces"
import { ListContent } from "./ListContent"
import { TagContent } from "./TagContent"
import { TaskContent } from "./TaskContent"

interface ContentProps {
    user: User
    isSideBarOpen: boolean
    contentSelected: string
}

export function Content({ user, isSideBarOpen, contentSelected }: ContentProps) {
    const content = contentSelected.split(' ')[0]

    return (
        <div className={`${isSideBarOpen ? "w-[calc(100vw-25vw)]" : "w-full justify-center"} h-full flex items-center`}>
            { 
                content == 'task' ?
                <TaskContent user={user} type={contentSelected.split(' ')[1]} />
                : content == 'list' ?
                <ListContent />
                : content == 'tag' ?
                <TagContent />
                : 'meu bacano'
            }
        </div>
    )
}
