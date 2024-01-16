import { db } from "@/db"
import { NextResponse, NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {

  request
  const search = request.nextUrl.searchParams.get('search')

  const users = await db.user.findMany({
    where: { 
      name: { 
        contains: 'faust', 
        mode: 'insensitive' 
      } 
    } 
  })
  return NextResponse.json({ profiles: users }, { status: 200 })
}