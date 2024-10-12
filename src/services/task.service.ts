import { TaskRepository } from '../repositories/TaskRepository'

type CreateTaskDTO = {
  title: string
  done?: boolean
}

type UpdateTaskDTO = { taskId: string } & Partial<CreateTaskDTO>

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async all() {
    return await this.taskRepository.all()
  }

  async add({ title, done }: CreateTaskDTO) {
    return await this.taskRepository.add({
      title,
      done: done ? true : false,
    })
  }

  async update({ taskId, title, done }: UpdateTaskDTO) {
    let task = await this.taskRepository.findById(String(taskId))

    if (task) {
      if (title) {
        task.title = title
      }
      if (done) {
        task.done = done ? done : false
      }

      return await task.save()
    }

    return null
  }

  async remove(taskId: string) {
    await this.taskRepository.remove(taskId)
  }
}
