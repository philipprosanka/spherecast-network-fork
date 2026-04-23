import { agnesGet, proxyResponse } from '@/lib/agnes-server'

export const maxDuration = 60

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const res = await agnesGet('/opportunities', searchParams, 8_000)
  return proxyResponse(res)
}
