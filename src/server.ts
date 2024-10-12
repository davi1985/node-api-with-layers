import express, { Request, Response, ErrorRequestHandler } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

import { router } from './routes/api'

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))

server.get('/ping', (_: Request, res: Response) => res.json({ pong: true }))

server.use(router)

server.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' })
})

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  console.log(err)

  res.status(400).json({ error: 'Ocorreu algum erro.' })
}

server.use(errorHandler)

server.listen(process.env.PORT, () => console.log('Server running'))
