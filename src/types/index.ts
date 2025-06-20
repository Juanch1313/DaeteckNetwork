export interface Client {
  id: string
  name: string
  maxLimit: string
  target: string
}

export type NewClient = Omit<Client, 'id'>

export interface OnuDetails {
  id: string
  board: string
  port: string
  name: string
  status: string
  signal: string
  signal1310: string
  signal1490: string
}

export type OnuSignals = Pick<OnuDetails, 'name' | 'status' | 'signal' | 'signal1310' | 'signal1490'>

export interface Zone {
  id: string
  name: string
}

export interface Obd {
  id: string
  name: string
  numberOfPorts: string
  latitude: string
  longitude: string
  zoneId: string
}
