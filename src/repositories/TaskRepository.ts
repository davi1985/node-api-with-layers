import { Task } from '../models/task'

type CreateTaskDTO = {
  title: string
  done?: boolean
}

type UpdateTaskDTO = { taskId: string } & Partial<CreateTaskDTO>

export class TaskRepository {
  async all() {
    return await Task.findAll()
  }

  async add({ title, done }: CreateTaskDTO) {
    return await Task.create({
      title,
      done: done ? true : false,
    })
  }

  async update({ taskId, title, done }: UpdateTaskDTO) {
    let task = await this.findById(String(taskId))

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

  async findById(taskId: string) {
    return await Task.findByPk(taskId)
  }

  async remove(taskId: string) {
    await Task.destroy({ where: { id: taskId } })
  }
}
