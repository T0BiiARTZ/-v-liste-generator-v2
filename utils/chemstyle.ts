/**
 * Einfache Heuristik für empfohlene Chemstyles.
 * Wenn Position nicht vorliegt, nutzen wir Namens-Heuristiken für häufige Spieler.
 * Default: 'Engine'
 */
export function recommendChemStyle(name?: string): string {
  const n = (name || '').toLowerCase()
  const map: Record<string,string> = {
    'maignan': 'Glove',
    'campos': 'Glove',
    'raya': 'Glove',
    'theo hernández': 'Anchor',
    'hernández': 'Anchor',
    'konaté': 'Anchor',
    'barella': 'Engine',
    'modrić': 'Maestro',
    'kimmich': 'Shadow',
    'rodri': 'Shadow',
    'caicedo': 'Shadow',
    'frimpong': 'Shadow',
    'openda': 'Hunter',
    'loïs openda': 'Hunter',
    'marmoush': 'Hunter',
    'kanu': 'Hunter',
    'luis díaz': 'Engine',
    'díaz': 'Engine',
    'doué': 'Engine',
    'neves': 'Maestro'
  }
  for (const key of Object.keys(map)) {
    if (n.includes(key)) return map[key]
  }
  return 'Engine'
}
