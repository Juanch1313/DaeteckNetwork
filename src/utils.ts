import { Client, NewClient } from './types'

export const validateClients = (clients: Client[] | undefined): boolean => {
  if (typeof clients === 'undefined') {
    return false
  }
  if (clients.length === 0) {
    return false
  }
  return true
}

export const validateClient = (client: Client | undefined): boolean => {
  if (typeof client === 'undefined') {
    return false
  }
  return true
}

export const toNewClient = (object: any): NewClient => {
  const newClient: NewClient = {
    name: parseName(object.name),
    target: parseTarget(object.target),
    maxLimit: parseMaxLimit(object.maxLimit)
  }
  return newClient
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Name is not valid')
  }
  return nameFromRequest
}

const parseTarget = (targetFromRequest: any): string => {
  if (!isString(targetFromRequest)) {
    throw new Error('Target is not valid')
  }
  return targetFromRequest
}

const parseMaxLimit = (maxLimitFromRequest: any): string => {
  if (!isString(maxLimitFromRequest)) {
    throw new Error('Max Limit is not valid')
  }
  return maxLimitFromRequest
}
