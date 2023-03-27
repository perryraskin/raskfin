import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-100 h-screen">
    <Header />
    <main className="bg-slate-100">{children}</main>
  </div>
)

export default Layout
