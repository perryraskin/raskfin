import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-100 h-screen">
    <Header />
    <main>{children}</main>
  </div>
)

export default Layout
