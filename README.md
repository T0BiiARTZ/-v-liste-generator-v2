# ÜV-Listen-Generator – Deploy-fertig (Vercel)

Enthält:
- Playername, Playerface, OVR, empfohlener Chemstyle, Kaufpreis, VK-Preis, Profit
- Ziel-Profit ~1.000 Coins (anpassbar via `TARGET_PROFIT`), inkl. Tick-Rundung
- Bindet deine Trading-List URL an

## Start
npm i
cp .env.example .env.local
npm run dev

## Deploy
- Repo auf GitHub pushen
- Bei Vercel neues Projekt → Repo verbinden
- ENV-Variablen setzen (wie in `.env.example`)
- Deploy

## Anpassen
- Tick-Ladder & Preislogik: `utils/pricing.ts`
- Chemstyle-Heuristik: `utils/chemstyle.ts`
- Parsing von "29.5K" etc.: `utils/number.ts`
