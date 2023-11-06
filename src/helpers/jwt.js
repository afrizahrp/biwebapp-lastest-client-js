import jwt from 'next-auth/jwt'
import { getToken } from 'next-auth/jwt'

// import jwt from 'jsonwebtoken'

const DEFAULT_OPTIONS = {
  expiresIn: '1d'
}

export const signJwtAccessToken = (req, options = DEFAULT_OPTIONS) => {
  const secretKey = process.env.NEXTAUTH_SECRET
  const token = getToken({ req, secret: secretKey })
  console.log('token', token)

  return token
}

export const verifyJwt = token => {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET
    const decoded = jwt.decode(token, secretKey)

    return decoded
  } catch (e) {
    console.error(e)

    return null
  }
}
