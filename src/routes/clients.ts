import express from 'express'
import { getClient, getClientById, addClient, deleteClient } from '../services/clientServices'

const router = express.Router()

router.get('/', async (_req, res) => {
  res.send(await getClient())
})

router.get('/:id', async (req, res) => {
  res.send(await getClientById(req.params.id))
})

router.post('/', async (req, res) => {
  res.send(await addClient(req.body.name, req.body.target, req.body.maxLimit))
})

router.delete('/:id', async (req, res) => {
  res.send(await deleteClient(req.params.id))
})

export default router
