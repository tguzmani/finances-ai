import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const AUTH_PASSWORD = process.env.AUTH_PASSWORD

export const signIn = async (password: string) => {
  if (password !== AUTH_PASSWORD) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1h' })
  return { token }
}

const authService = {
  signIn,
}

export default authService
