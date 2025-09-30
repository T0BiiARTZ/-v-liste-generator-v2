'use client'
import Image from 'next/image'
import { useState } from 'react'

type Item = {
  id: string
  name: string
  image?: string
  rating: number
  chem: string
  buyPrice: number
  listPrice: number
  profit: number
  lastUpdated?: string
}

export default function Page(){
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [budget, setBudget] = useState<number | ''>('')

  async function load(){
    try{
      setLoading(true); setError(null)
      const qs = new URLSearchParams()
      if(budget) qs.set('budget', String(budget))
      const res = await fetch('/api/uv?'+qs.toString())
      if(!res.ok) throw new Error('API error '+res.status)
      const json = await res.json()
      setItems(json.items)
    }catch(e:any){
      setError(e.message)
    }finally{ setLoading(false) }
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">ÜV-Listen-Generator (EA FC 26)</h1>
      <p className="text-gray-500">Ziel-Profit ca. 1.000 Coins (anpassbar via ENV).</p>

      <div className="flex gap-4 items-end">
        <label className="flex flex-col gap-1">
          <span>Budget (optional)</span>
          <input type="number" className="border rounded-lg p-2" value={budget} onChange={e=>setBudget(e.target.value === '' ? '' : Number(e.target.value))} />
        </label>
        <button onClick={load} disabled={loading} className="px-4 py-2 rounded-xl shadow border">
          {loading ? 'Lade…' : 'Liste laden'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Player</th>
              <th className="p-2">Face</th>
              <th className="p-2">OVR</th>
              <th className="p-2">Chemstyle (empf.)</th>
              <th className="p-2">Kaufpreis</th>
              <th className="p-2">VK-Preis</th>
              <th className="p-2">Profit</th>
              <th className="p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id} className="border-b">
                <td className="p-2">{it.name}</td>
                <td className="p-2">
                  {it.image ? (
                    <Image src={it.image} alt={it.name} width={48} height={48} className="rounded" />
                  ) : '—'}
                </td>
                <td className="p-2">{it.rating}</td>
                <td className="p-2">{it.chem}</td>
                <td className="p-2">{it.buyPrice.toLocaleString()}</td>
                <td className="p-2">{it.listPrice.toLocaleString()}</td>
                <td className="p-2">{it.profit.toLocaleString()}</td>
                <td className="p-2">{it.lastUpdated ? new Date(it.lastUpdated).toLocaleTimeString() : '—'}</td>
              </tr>
            ))}
            {(!loading && items.length === 0) && (
              <tr><td className="p-2 text-gray-500" colSpan={8}>Noch keine Daten geladen.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
