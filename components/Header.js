import Link from 'next/link'
import { useState } from 'react';
// Style 
import styles from '../styles/Header.module.scss'
// React icons 
import {GiHamburgerMenu} from 'react-icons/gi';
import HomeHeader from './HomeHeader';


function Header() {
  // for  navbar in small screens 
  const [showNav, setShowNav] = useState(false)

  // toggle the value of showNav
  const handleShowNavbar = () => {
    setShowNav(!showNav)
  }

  return (
    <>
    <header className={styles.header}>
      <nav>
        <div className={styles.navContainer} >
            <div className={styles.logo}>
              <h1>logo</h1>
            </div>
            <div className={styles.menuIcon} onClick={handleShowNavbar}>
            <GiHamburgerMenu />
          </div>
          {/* shownor hide based on showNav */}
          <div className={`${styles.listitems} ${showNav ? styles.show : ""}`}>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/">
                  About
                </Link>
              </li>
              <li>
                <Link href="/">
                  About
                </Link>
              </li> <li>
                <Link href="/">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <HomeHeader /> 
    </>
  )
}

export default Header