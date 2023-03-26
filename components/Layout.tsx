import styles from "/styles/Shared.module.css"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className={styles.container}>{children}</main>
  </>
)

export default Layout
