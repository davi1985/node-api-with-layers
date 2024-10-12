import { Request, Response } from 'express'
import { Task, ITask } from '../models/task'
import { TaskService } from '../services/task.service'

type TaskRequestBody = Partial<Pick<ITask, 'title' | 'done'>>
type TaskRequestParam = { id: string }

export class TaskController {
  constructor(private taskService: TaskService) {}

  async all(_: Request, res: Response) {
    const tasks = await this.taskService.all()

    res.json(tasks)
  }

  async add(req: Request, res: Response) {
    const { title, done } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Required pass title' })
    }

    const task = await this.taskService.add({
      title,
      done: done ? true : false,
    })

    res.status(201).json({ task })
  }

  async update(
    req: Request<TaskRequestParam, any, TaskRequestBody>,
    res: Response
  ) {
    const taskId = req.params.id
    const { title, done } = req.body

    let task = await this.taskService.update({
      taskId,
      title,
      done,
    })

    if (!task) {
      return res.status(404).json({ error: 'Task not founded' })
    }

    res.json({ task })
  }

  async remove(req: Request<TaskRequestParam>, res: Response) {
    const taskId = req.params.id

    await this.taskService.remove(taskId)

    res.sendStatus(204)
  }
}
