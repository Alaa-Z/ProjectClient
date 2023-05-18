import Link from 'next/link'
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

// Style 
import styles from '../styles/Header.module.scss'
// React icons 
import {GiHamburgerMenu} from 'react-icons/gi';
import HomeHeader from './HomeHeader';

import Cookies from 'js-cookie';
import LogoutButton from './LogoutButton';


function Header() {
  // for  navbar in small screens 
  const [showNav, setShowNav] = useState(false)
  const [authToken, setAuthToken] = useState('');
  const [decoded, setDecoded] = useState(false);

  // toggle the value of showNav
  const handleShowNavbar = () => {
    setShowNav(!showNav)
  }

  useEffect(() => {
    setAuthToken(Cookies.get('auth-token'));
    // var decodedAuth = jwt_decode(Cookies.get('auth-token'));
    if((Cookies.get('auth-token'))){
      setDecoded(jwt_decode(Cookies.get('auth-token')));
    }
  }, []);

  return (
    <>
    <header className={styles.header}>
      <nav>
        <div className={styles.navContainer} >
            <div className={styles.logo}>
              <img src="/logo.png" alt="logo for bookShare website represents collections of books with 2 hands"></img>
              <p>Books Borrowing Platform </p> 
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

              {authToken && decoded.isAdmin ? (
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              ) 
              : null}

              <li>
                <Link href="/book">
                  Books
                </Link>
              </li>

              {authToken  ? (
                <li>
                  <Link href="/profile">Profile</Link>
                  </li>
              ) 
              : null}

              {authToken  ? (
                <li>
                  <Link href="/conversations">Inbox</Link>
                  </li>
              ) 
              : null}

              {authToken ? (
                <li>
                  <LogoutButton  />
                </li>
              ) 
              : (
              <li> 
                <Link href="/login">Log in</Link>
              </li>
              )
              }

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