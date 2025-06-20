import express from 'express'
import { getAllZones, getZoneByNameOrId } from '../services/zoneServices'

const router = express.Router()

router.get('/', async (_req, res) => {
  const zones = await getAllZones()
  if (zones.length === 0) {
    res.status(404).send('Zones not found')
    return
  }
  res.status(200).json(zones)
})

router.get('/:id', async (req, res) => {
  const zones = await getZoneByNameOrId(req.params.id)
  if (zones === null || zones === undefined) {
    res.status(404).send('Zones not found')
    return
  }
  res.status(200).json(zones)
})

export default router
