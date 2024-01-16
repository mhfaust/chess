import { db } from "@/db"
import { NextResponse, NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {

  request
  const search = request.nextUrl.searchParams.get('search')

  const users = search ? await db.user.findMany({
    where: { 
      name: { 
        contains: search, 
        mode: 'insensitive' 
      } 
    } 
  }) : []
  return NextResponse.json({ profiles: users }, { status: 200 })
}