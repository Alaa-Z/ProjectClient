import Header from './Header'
import Footer from './Footer'
import styles from '../styles/MainLayout.module.scss'
import { useRouter } from 'next/router';

 export default function MainLayout({ children }) {
  const router = useRouter();
  // Define which page is rendering 
  const isLoginPage = router.pathname === '/login';

   return (
     <>
      <Header />
      {/* Change class nmae based on the rendered page  */}
      <main className={isLoginPage ? styles.mainWithImage : styles.main} >{children}</main>
      <Footer />
     </>
   )
}