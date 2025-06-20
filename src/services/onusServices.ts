import * as dotnev from 'dotenv'
import { OnuDetails, OnuSignals } from '../types'

dotnev.config()

const Ip = process.env.SmartOltIp as string
const token = process.env.TokenAPI as string

export const GetAllOnus = async (): Promise<OnuDetails[]> => {
  try {
    const response = await fetch(Ip + 'onu/get_all_onus_details?olt_id=1&board=&port=&zone=&odb=', {
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

    const onus: OnuDetails[] = data.onus.map((item: any) => ({
      id: item.unique_external_id,
      board: item.board,
      port: item.port,
      name: item.name,
      status: item.status,
      signal: item.signal,
      signal1310: item.signal_1310,
      signal_1490: item.signal_1490
    }))

    return onus
  } catch (error) {
    throw new Error('Error getting onus')
  }
}

export const GetAllOnusSignals = async (): Promise<OnuSignals[]> => {
  try {
    const response = await fetch(Ip + 'onu/get_all_onus_details?olt_id=1&board=&port=&zone=&odb=', {
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

    const onus: OnuSignals[] = data.onus.map((item: any) => ({
      name: item.name,
      status: item.status,
      signal: item.signal,
      signal1310: item.signal_1310,
      signal_1490: item.signal_1490
    }))

    return onus
  } catch (error) {
    throw new Error('Error getting onus')
  }
}

export const GetOnuDetailsByName = async (name: string): Promise<OnuDetails> => {
  try {
    const response = await fetch(Ip + 'onu/get_all_onus_details?olt_id=1&board=&port=&zone=&odb=', {
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

    const onus: OnuDetails[] = data.onus.map((item: any) => ({
      id: item.unique_external_id,
      board: item.board,
      port: item.port,
      name: item.name,
      status: item.status,
      signal: item.signal,
      signal1310: item.signal_1310,
      signal_1490: item.signal_1490
    }))

    return onus.find(o => o.name === name) as OnuDetails
  } catch (error) {
    throw new Error('Error getting onus')
  }
}

export const GetOnuSignalsByName = async (name: string): Promise<OnuSignals> => {
  try {
    const response = await fetch(Ip + 'onu/get_all_onus_details?olt_id=1&board=&port=&zone=&odb=', {
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

    const onus: OnuSignals[] = data.onus.map((item: any) => ({
      name: item.name,
      status: item.status,
      signal: item.signal,
      signal1310: item.signal_1310,
      signal_1490: item.signal_1490
    }))

    return onus.find(o => o.name === name) as OnuSignals
  } catch (error) {
    throw new Error('Error getting onus')
  }
}
