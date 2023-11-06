import prisma from '../../../prisma/client'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(NextRequest) {
  const groupProducts = await prisma.icStkGroup.findMany({
    where: {
      isShow: true
    }
  })

  return NextResponse.json(groupProducts)
}
