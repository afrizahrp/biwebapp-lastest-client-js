const { DefaultSession, DefaultUser } = require('next-auth')
const { DefaultJWT } = require('next-auth/jwt')

// Implement module augmentation for Session
const extendSession = session => {
  return {
    ...session,
    user: {
      ...session.user,
      id: '', // Add your custom 'id'
      role: '', // Add your custom 'role'
      name: '', // Add your custom 'name'
      avatar: '' // Add your custom 'avatar'
    }
  }
}

// Implement module augmentation for User
const extendUser = user => {
  return {
    ...user,
    role: '', // Add your custom 'role'
    name: '', // Add your custom 'name'
    avatar: '' // Add your custom 'avatar'
  }
}

// Implement module augmentation for JWT
const extendJWT = token => {
  return {
    ...token,
    role: '' // Add your custom 'role'
  }
}

// You can use these functions when working with sessions, users, and tokens
const session = extendSession(DefaultSession)
const user = extendUser(DefaultUser)
const token = extendJWT(DefaultJWT)

export default extendSession
