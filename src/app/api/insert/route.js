import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nomeGiocatore = searchParams.get('nomegiocatore');
  const score = searchParams.get('score');
 
  try {
    if (!nomeGiocatore || !score) throw new Error('Sono richiesti il nome utente e il suo punteggio');
    await sql`INSERT INTO leadboard (nome_giocatore, score) VALUES (${nomeGiocatore}, ${score})`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const data = await sql`SELECT * FROM leadboard;`;
  return NextResponse.json({ data }, { status: 200 });
}