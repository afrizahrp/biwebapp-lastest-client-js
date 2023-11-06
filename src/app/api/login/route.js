import prisma from 'src/prisma/libs/prisma'
import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from 'src/helpers/jwt'

export async function POST(request) {
  console.log('login', request)

  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: 'Both fields are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    })

    if (!user) {
      return NextResponse.json({ message: 'No user found' }, { status: 400 })
    }

    if (await bcrypt.compare(password, user.password)) {
      const { ...result } = user

      const accessToken = signJwtAccessToken(result)

      // if (user) {
      //   const updateLoginStatus = await prisma.User.update({
      //     where: { username: username.toLowerCase() },
      //     data: { isLoggedIn: true, accessToken: accessToken }
      //   })
      // }

      // if (!user.is_verified) {
      //   return NextResponse.json({ message: 'Not verified' }, { status: 400 });
      // }

      // return NextResponse.json({ result: { ...result } }, { status: 200 })

      return NextResponse.json({ result: { ...result, accessToken } }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Password incorrect' }, { status: 400 })
    }
  } catch (e) {
    console.error(e)

    return NextResponse.json({ message: 'Something went wrong while trying to log in', result: e }, { status: 500 })
  }
}
