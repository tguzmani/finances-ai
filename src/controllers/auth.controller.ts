import { Request, Response } from 'express'
import authService from '../services/auth.service'

export const signIn = async (req: Request, res: Response) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ message: 'Password is required' })
    }

    const { token } = await authService.signIn(password)
    res.json({ token })
  } catch (error) {
    res.status(401).json({ message: (error as Error).message })
  }
}
