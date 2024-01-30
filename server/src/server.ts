import fastify from 'fastify'
import { PrismaClient, Task } from '@prisma/client'
import { z } from 'zod'
import cors from '@fastify/cors'

const app = fastify()
const prisma = new PrismaClient({
    log: ['query']
})

app.register(cors)

app.post('/login', async (request, response) => {
    const userBodySchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        picture: z.string().nullable()
    })

    const { name, email, picture } = userBodySchema.parse(request.body)

    const users = await prisma.user.findMany({
        where: {
            email
        }
    })

    if (users.length === 0) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                picture
            }
        })

        return response.send(user)
    } else {
        return response.send(users[0])
    }
})

app.get('/user/:id', async (request, response) => {
    const userParamsSchema = z.object({
        id: z.string()
    })

    const { id } = userParamsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            tasklists: {
                include: {
                    tasks: true
                }
            },
            tags: true,
            stickys: true
        }
    })

    return response.send(user)
})

app.post('/tasklist', async (request, response) => {
    const userBodySchema = z.object({
        name: z.string(),
        color: z.string(),
        userId: z.string().uuid()
    })

    const { name, color, userId } = userBodySchema.parse(request.body)

    const tasklist = await prisma.tasklist.create({
        data: {
            name,
            color,
            userId
        }
    })

    return response.send(tasklist)
})

app.post('/tag', async (request, response) => {
    const useBodySchema = z.object({
        name: z.string(),
        color: z.string(),
        userId: z.string().uuid()
    })

    const { name, color, userId } = useBodySchema.parse(request.body)

    const tag = await prisma.tag.create({
        data: {
            name,
            color,
            userId
        }
    })

    return response.send(tag)
})

app.get('/tasks/manager/:userId', async (request, response) => {
    interface Task {
        id: string
        name: string
        description: string
        dueDate: Date
        tasklistId: string
    }

    const useParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = useParamsSchema.parse(request.params)

    let upcomingTasks: Task[] = []
    var todayTasks: Task[] = []

    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`

    const today = new Date(`${year}-${month}-${day}`).toISOString()

    const userTasks = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        include: {
            tasklists: {
                include: {
                    tasks: true
                }
            }
        }
    })

    userTasks.tasklists.map((userTasklist) => {
        userTasklist.tasks.map((task) => {
            const taskFullDate = task.dueDate.toISOString().split('T')
            const taskDate = new Date(taskFullDate[0]).toISOString()

            if (today === taskDate) {
                todayTasks.push(task)
            } else if (taskDate > today) {
                upcomingTasks.push(task)
            }
        })
    })

    return response.send({ upcomingTasks, todayTasks })
})

app.post('/sticky', async (request, response) => {
    const useBodySchema = z.object({
       title: z.string(),
       description: z.string(),
       color: z.string(),
       userId: z.string().uuid() 
    })

    const { title, description, color, userId } = useBodySchema.parse(request.body)

    const sticky = await prisma.sticky.create({
        data: {
            title,
            description,
            color,
            userId
        }
    })

    return response.send(sticky)
})

app.put('/sticky/update', async (request, response) => {
    const useBodySchema = z.object({
        stickyId: z.string().cuid(),
        title: z.string(),
        description: z.string()
    })

    const { stickyId, title, description } = useBodySchema.parse(request.body)

    const sticky = await prisma.sticky.update({
        where: {
            id: stickyId
        },
        data: {
            title,
            description
        }
    })

    return response.send(sticky)
})

app.get('/stickys/:userId', async (request, response) => {
    const useParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = useParamsSchema.parse(request.params)

    const stickys = await prisma.sticky.findMany({
        where: {
            userId
        }
    })

    return response.send(stickys)
})

app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(() => {
    console.log('Http server is running...')
})
