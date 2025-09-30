import { NextRequest, NextResponse } from 'next/server'
import { parseCoinString } from '@/utils/number'
import { suggestListPrice } from '@/utils/pricing'
import { recommendChemStyle } from '@/utils/chemstyle'

export const runtime = 'edge'

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const budget = Number(searchParams.get('budget') || '0')
  const targetProfitEnv = Number(process.env.TARGET_PROFIT || '1000')
  const url = process.env.TRADING_LIST_URL
  if(!url) return NextResponse.json({ error: 'TRADING_LIST_URL not set' }, { status: 500 })
  const bearer = process.env.TRADING_LIST_BEARER

  const upstream = await fetch(url, {
    headers: { ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}) },
    cache: 'no-store'
  })
  if(!upstream.ok){
    return NextResponse.json({ error: 'Upstream error '+upstream.status }, { status: 502 })
  }
  const data: any[] = await upstream.json()
  const items = data.map((p:any)=>{
    const buy = parseCoinString(p.buy_for)
    const upstreamSell = parseCoinString(p.sell_for)
    const tax = Number(p.tax) || 0
    const desiredSell = suggestListPrice(buy, tax, targetProfitEnv)
    const sell = Math.max(upstreamSell || 0, desiredSell) // nimm mindestens unseren Ziel-VK
    const profit = Math.max(0, sell - buy - tax)
    return {
      id: p.id,
      name: p.name,
      image: p.image,
      rating: Number(p.rating) || 0,
      chem: recommendChemStyle(p.name),
      buyPrice: buy,
      listPrice: sell,
      profit,
      lastUpdated: p.last_updated
    }
  })
  .filter((x:any)=> budget ? x.buyPrice <= budget : true)

  return NextResponse.json({ items })
}
