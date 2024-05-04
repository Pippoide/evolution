import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const result = await prisma.leadBoard.findMany({ orderBy: { score: 'desc' } });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req,res) {
  const data = await req.json()
  try {
    const leadboard = await prisma.leadBoard.create({ data });
    return NextResponse.json(leadboard, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}
