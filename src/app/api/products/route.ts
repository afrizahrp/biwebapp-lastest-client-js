import prisma from '../../../prisma/client'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(NextRequest) {
  const products = await prisma.icStkmast.findMany({
    where: {
      isShowed: true
    }
  })

  return NextResponse.json(products)
}
