'use server'
 
import { revalidateTag } from 'next/cache'
 
export default async function actionRevalidateTag(data) {
  revalidateTag(data)
}