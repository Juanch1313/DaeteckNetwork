import express from 'express'
import { GetAllObds, GetObdByNameOrId } from '../services/obdServices'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const obds = await GetAllObds(req.params.id)
  if (obds.length === 0) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(obds)
})

router.get('/', async (req, res) => {
  const obd = await GetObdByNameOrId(req.body.zoneId, req.body.id)
  if (obd === null || obd === undefined) {
    res.status(404).send('Not found')
    return
  }
  res.status(200).json(obd)
})

export default router
