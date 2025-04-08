import { Request, Response } from 'express'
import statusService from '../services/status.service'

export const getStatus = async (_req: Request, res: Response) => {
  try {
    const status = await statusService.getStatus()
    res.status(200).json(status)
  } catch (error: any) {
    console.error('Status Error:', error)
    res.status(500).json({
      error: error.message || '❌ Failed to get status!',
    })
  }
}

const statusController = {
  getStatus,
}

export default statusController
