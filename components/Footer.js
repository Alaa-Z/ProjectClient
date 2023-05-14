import styles from '../styles/Footer.module.scss'

import { MdEmail } from 'react-icons/md';
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'

import Link from 'next/link';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.content}>
            <h3>BookShare</h3>
            <p>A Community For Sharing Books</p>
            <ul className={styles.socials}>
              <li><Link href="mailto:alza2100@student.miun.se"> <MdEmail className={styles.icon}/></Link></li>
              <li><Link href="linkedin.com/in/zaza-alaa"> <AiFillLinkedin className={styles.icon}/></Link></li>
              <li><Link href="https://github.com/Alaa-Z"> <AiFillGithub className={styles.icon}/></Link></li>
            </ul>
        </div>
        <div className={styles.footerBottom}>
            <p>copyright &copy; <Link href="https://alaazaza.com/">Alaa Zaza</Link>  </p>
              <div className={styles.menu}>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/login">login</Link></li>
                </ul>
              </div>
        </div>
      </footer>
    )
} 