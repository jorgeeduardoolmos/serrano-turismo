// Layout wrapper for legacy destino pages — provides top padding to account for fixed navbar
export default function DestinoLayout({ children }: { children: React.ReactNode }) {
  return <div className="content-wrapper">{children}</div>
}
