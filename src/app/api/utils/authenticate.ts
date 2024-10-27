import { NextRequest } from 'next/server'

// Fake authentication function
export const authenticate = (request: NextRequest) => {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader) {
    throw new Error('Authorization header is missing')
  }
  const userId = authHeader.split(' ')[1] // assumes "Bearer userId123" format
  if (!userId) {
    throw new Error('Invalid Authorization format')
  }
  return userId
}
