import * as dotnev from 'dotenv'
import { Obd } from '../types'

dotnev.config()

const Ip = process.env.SmartOltIp as string
const token = process.env.TokenAPI as string

export const GetAllObds = async (idZone: string): Promise<Obd[]> => {
  try {
    const response = await fetch(Ip + `system/get_odbs/${idZone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })

    if (!response.ok) {
      throw new Error('Error at the fetch Onus')
    }

    const data = await response.json()
    const obds: Obd[] = data.response.map((o: any) => ({
      id: o.id,
      name: o.name,
      numberOfPorts: o.nr_of_ports,
      latitude: o.latitude,
      longitude: o.longitude,
      zoneId: o.zone_id
    }))
    return obds
  } catch (error) {
    throw new Error('Error getting the Obds')
  }
}

export const GetObdByNameOrId = async (idZone: string, id: string): Promise<Obd> => {
  try {
    const response = await fetch(Ip + `system/get_odbs/${idZone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    })

    if (!response.ok) {
      throw new Error('Error at the fetch Onus')
    }

    const data = await response.json()
    const obds: Obd[] = data.response.map((o: any) => ({
      id: o.id,
      name: o.name,
      numberOfPorts: o.nr_of_ports,
      latitude: o.latitude,
      longitude: o.longitude,
      zoneId: o.zone_id
    }))
    return obds.find(o => o.id === id || o.name === id) as Obd
  } catch (error) {
    throw new Error('Error getting the Obds')
  }
}
