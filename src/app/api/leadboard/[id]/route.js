import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function DELETE(req, { params }) {
    const { id } = params
    try {
        const leadboard = await prisma.leadBoard.deleteMany({})
     // const leadboard = await prisma.leadBoard.delete({ where: {id:parseInt(id) }});
      return NextResponse.json(leadboard, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.toString() }, { status: 500 });
    }
  }