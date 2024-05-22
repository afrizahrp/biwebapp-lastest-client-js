import prisma from '../../../../prisma/client'
import { getServerSession } from 'next-auth'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { item_cd: string } }) {
  const products = await prisma.icStkmast.findUnique({
    where: {
      item_cd: params.item_cd
    }
  })

  return NextResponse.json(products)
}
