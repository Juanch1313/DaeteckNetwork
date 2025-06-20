import { RouterOSAPI } from 'node-routeros'
import { Client, NewClient } from '../types'
import { IRosGenericResponse } from 'node-routeros/dist/IRosGenericResponse'
import * as dotnev from 'dotenv'

dotnev.config()

const conn = new RouterOSAPI({
  host: process.env.HOST as string,
  user: process.env.USERREAD,
  password: process.env.PASSWORD
})

const connW = new RouterOSAPI({
  host: process.env.HOST as string,
  user: process.env.USERWRITE,
  password: process.env.PASSWORD
})

export const getClients = async (): Promise<Client[] | undefined> => {
  try {
    await conn.connect()
    const result: IRosGenericResponse[] = await conn.write('/queue/simple/print')

    const clients: Client[] = result.map(c => ({
      id: c['.id'],
      name: c.name,
      target: c.target,
      maxLimit: c['max-limit']
    }))

    await conn.close()
    return clients
  } catch (e) {
    throw new Error('Error al obtener clientes')
  }
}

export const getClientById = async (name: string): Promise<Client | undefined> => {
  try {
    await conn.connect()
    const result: IRosGenericResponse[] = await conn.write('/queue/simple/print')

    const clients: Client[] = result.map(c => ({
      id: c['.id'],
      name: c.name,
      target: c.target,
      maxLimit: c['max-limit']
    }))

    await conn.close()

    return clients.find(c => c.name === name)
  } catch (e) {
    throw new Error('Error al encontrar cliente')
  }
}

export const addClient = async (newClient: NewClient): Promise<IRosGenericResponse | string | undefined> => {
  try {
    await connW.connect()

    const res = await connW.write('/queue/simple/add', [
      `=name=${newClient.name}`,
      `=target=${newClient.target}`,
      `=max-limit=${newClient.maxLimit}`
    ])
    await connW.close()
    return res
  } catch (e) {
    throw new Error('Error al añadir cliente')
  }
}

export const deleteClient = async (name: string): Promise<IRosGenericResponse | string | undefined> => {
  try {
    await connW.connect()

    const clients = await getClients()
    const client = clients?.find(c => c.name === name)
    if (client === undefined) {
      throw new Error('Client not found')
    }
    const res = await connW.write('/queue/simple/remove', [`=.id=${client?.id}`])
    await connW.close()
    return res
  } catch (e) {
    throw new Error('Error deletring client')
  }
}
