export interface User {
    id: string
    name: string
    email: string
    picture: string
    tasklists: Tasklist[]
    tags: Tag[]
    stickys: Sticky[]
}

export interface Tasklist {
    id: string
    name: string
    createdAt: string
    color: string
    tasks: Task[]
}

export interface Task {
    id: string
    name: string
    description: string
    dueDate: string
    tags: Tag[]
}

export interface Tag {
    id: string
    name: string
    color: string
    tasks: Task[]
}

export interface Sticky {
    id: string
    title: string
    description: string
    color: string
    createdAt: string
}
