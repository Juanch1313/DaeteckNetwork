import express from 'express'
import * as dotnev from 'dotenv'
import clientRouter from './routes/clients'
import onuRouter from './routes/onus'
import zoneRouter from './routes/zones'
import obdRouter from './routes/obds'

dotnev.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT as string

app.use('/api/clients', clientRouter)

app.use('/api/onus', onuRouter)

app.use('/api/zones', zoneRouter)

app.use('/api/obds', obdRouter)

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`)
})
