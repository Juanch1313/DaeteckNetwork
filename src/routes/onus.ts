import express from 'express'
import { GetAllOnus, GetAllOnusSignals, GetOnuDetailsByName, GetOnuSignalsByName } from '../services/onusServices'

const router = express.Router()

router.get('/', async (_req, res) => {
  const onus = await GetAllOnus()
  if (onus.length === 0) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(onus)
})

router.get('/:id', async (req, res) => {
  const onu = await GetOnuDetailsByName(req.params.id)
  if (onu === undefined || onu === null) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(onu)
})

router.get('/signals', async (_req, res) => {
  const onus = await GetAllOnusSignals()
  if (onus.length === 0) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(onus)
})

router.get('/signals/:id', async (req, res) => {
  const onu = await GetOnuSignalsByName(req.params.id)
  if (onu === undefined || onu === null) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(onu)
})

export default router
