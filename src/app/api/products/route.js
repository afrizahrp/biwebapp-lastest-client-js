import prisma from '../../../prisma/client'

import { NextRequest, NextResponse } from 'next/server'

export async function GET(NextRequest) {
  const req = NextRequest

  const { searchParams } = new URL(req.url)

  const searchCategory = searchParams.get('searchCategory') || 'Semua Kategori'

  const searchQuery = searchParams.get('searchQuery') || ''

  let filters = {
    item_descs: {
      contains: searchQuery
    },
    isShowed: true
  }

  if (searchCategory !== 'Semua Kategori') {
    filters.group_descs = searchCategory
  }

  const products = await prisma.products.findMany({
    where: {
      ...filters
    }
  })

  return NextResponse.json(products)
}
