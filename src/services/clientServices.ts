import { RouterOSAPI } from 'node-routeros'
import { Client } from '../types'
import { IRosGenericResponse } from 'node-routeros/dist/IRosGenericResponse'

const conn = new RouterOSAPI({
  host: '177.242.140.138',
  user: 'api.read',
  password: 'Daeteck17*'
})

const connW = new RouterOSAPI({
  host: '177.242.140.138',
  user: 'api.write',
  password: 'Daeteck17*'
})

export const getClient = async (): Promise<Client[] | undefined> => {
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
    return undefined
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
    return undefined
  }
}

export const addClient = async (name: string, target: string, maxLimit: string): Promise<IRosGenericResponse | string | undefined> => {
  try {
    await connW.connect()

    const res = await connW.write('/queue/simple/add', [
      `=name=${name}`,
      `=target=${target}`,
      `=max-limit=${maxLimit}`
    ])
    await connW.close()
    return res
  } catch (e) {
    if (e instanceof Error) {
      return e.message
    }
    return undefined
  }
}

export const deleteClient = async (name: string): Promise<IRosGenericResponse | string | undefined> => {
  try {
    await connW.connect()

    const clients = await getClient()
    const client = clients?.find(c => c.name === name)
    if (client !== undefined) {
      const res = await connW.write('/queue/simple/remove', [`=.id=${client?.id}`])
      await connW.close()
      return res
    }
    return undefined
  } catch (e) {
    if (e instanceof Error) {
      return e.message
    }
    return undefined
  }
}
