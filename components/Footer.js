import styles from '../styles/Footer.module.scss'

import { MdEmail } from 'react-icons/md';
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'
import { useState, useEffect } from 'react';

import Link from 'next/link';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';



export default function Footer() {
  const [authToken, setAuthToken] = useState('');
  const [decoded, setDecoded] = useState(false);

  useEffect(() => {
    setAuthToken(Cookies.get('auth-token'));
    // var decodedAuth = jwt_decode(Cookies.get('auth-token'));
    if((Cookies.get('auth-token'))){
      setDecoded(jwt_decode(Cookies.get('auth-token')));
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
          <p className={styles.heading}>BookShare</p>
          <p>A Community For Sharing Books</p>
          <ul className={styles.socials}>
            <li><a href="mailto:alza2100@student.miun.se" target='_blank' > <span className={styles.srOnly}>send email to alza2100@student.miun.se </span> <MdEmail className={styles.icon}/></a></li>
            <li><a href="linkedin.com/in/zaza-alaa" target='_blank' > <span className={styles.srOnly}>Visit linkedin website linkedin.com/in/zaza-alaa </span> <AiFillLinkedin className={styles.icon}/></a></li>
            <li><a href="https://github.com/Alaa-Z" target='_blank' > <span className={styles.srOnly}>Visit github website https://github.com/Alaa-Z </span>  <AiFillGithub className={styles.icon}/></a></li>
          </ul>
      </div>
      <div className={styles.footerBottom}>
          <p>copyright &copy; <a href="https://alaazaza.com/" target='_blank'>Alaa Zaza</a>  </p>
            <div className={styles.menu}>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                {authToken ? (
                <li><Link href="/logout">Logout</Link></li>
                ): (
                  <li><Link href="/login">Login</Link></li>
                )}

                {authToken && decoded.isAdmin ? (
                null
                ): (
                  <li><Link href="/contact">Contact us</Link></li>
                )}
              </ul>
            </div>
      </div>
    </footer>
  )
} 