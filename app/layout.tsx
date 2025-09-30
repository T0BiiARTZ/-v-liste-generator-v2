// app/layout.tsx
export const metadata = {
  title: 'ÜV-Listen-Generator',
  description: 'EA FC 26 ÜV-Liste mit Ziel-Profit ~1k',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        background: '#0b0d10',
        color: '#e5e7eb',
      }}>
        {children}
      </body>
    </html>
  );
}
