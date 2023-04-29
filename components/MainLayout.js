import Header from './Header'
import Footer from './Footer'
import styles from '../styles/MainLayout.module.scss'

 export default function MainLayout({ children }) {
   return (
     <>
       <Header />
       <main className={styles.main}>{children}</main>
       <Footer />
     </>
   )
}