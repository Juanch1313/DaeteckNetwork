import * as dotnev from 'dotenv'
import { Zone } from '../types'

dotnev.config()

const Ip = process.env.SmartOltIp as string
const token = process.env.TokenAPI as string

export const getAllZones = async (): Promise<Zone[]> => {
  try {
    const response = await fetch(Ip + 'system/get_zones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })

    const data = await response.json()
    const zones: Zone[] = data.response.map((z: any) => ({
      id: z.id,
      name: z.name
    }))

    return zones
  } catch (error) {
    throw new Error('Error getting the zones')
  }
}

export const getZoneByNameOrId = async (id: string): Promise<Zone> => {
  try {
    const response = await fetch(Ip + `system/get_zones/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })

    const data = await response.json()
    const zones: Zone[] = data.response.map((z: any) => ({
      id: z.id,
      name: z.name
    }))

    return zones.find(z => z.id === id || z.name === id) as Zone
  } catch (error) {
    throw new Error('Error getting a zone')
  }
}
