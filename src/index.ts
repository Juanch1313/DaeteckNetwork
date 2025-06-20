import express from 'express'
import * as dotnev from 'dotenv'
import clientRouter from './routes/clients'

dotnev.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT as string

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/clients', clientRouter)

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`)
})
