import { Router } from 'express'

import { TaskController } from '../controllers/task.controller'
import { TaskRepository } from '../repositories/TaskRepository'
import { TaskService } from '../services/task.service'

const router = Router()

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)
const self = taskController

router.get('/tasks', taskController.all.bind(self))
router.post('/tasks', taskController.add.bind(self))
router.put('/tasks/:id', taskController.update.bind(self))
router.delete('/tasks/:id', taskController.remove.bind(self))

export { router }
