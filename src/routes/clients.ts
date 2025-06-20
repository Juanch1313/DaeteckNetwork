import express from 'express'
import { getClients, getClientById, addClient, deleteClient } from '../services/clientServices'
import { toNewClient, validateClient, validateClients } from '../utils'

const router = express.Router()

router.get('/', async (_req, res) => {
  const clients = await getClients()
  const validation = validateClients(clients)
  if (!validation) {
    res.status(404).send('Clients not found')
    return
  }
  res.status(200).send(clients)
})

router.get('/:id', async (req, res) => {
  const client = await getClientById(req.params.id)
  const validation = validateClient(client)
  if (!validation) {
    res.status(404).send('Client not found')
    return
  }
  res.status(200).send(client)
})

router.post('/', async (req, res) => {
  const newClient = toNewClient(req.body)

  const addedClient = addClient(newClient)

  if (addedClient === undefined || addedClient === null) {
    res.status(404).send('No fue posible crear el cliente')
  }
  res.status(201).send(addedClient)
})

router.delete('/:id', async (req, res) => {
  try {
    res.status(204).send(await deleteClient(req.params.id))
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).send('Error')
    }
  }
})

export default router
