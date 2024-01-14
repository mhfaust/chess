import { db } from "app/_db"
import { NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async () => {

  // let response = NextResponse.next()

  // return db.user.findMany({ where: { email: { contains: partialEmail } } })
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