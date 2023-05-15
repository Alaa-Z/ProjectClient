import styles from '../styles/Footer.module.scss'

import { MdEmail } from 'react-icons/md';
import {AiFillLinkedin} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'

import Link from 'next/link';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.content}>
            <p className={styles.heading}>BookShare</p>
            <p>A Community For Sharing Books</p>
            <ul className={styles.socials}>
              <li><Link href="mailto:alza2100@student.miun.se"> <span className={styles.srOnly}>send email to alza2100@student.miun.se </span> <MdEmail className={styles.icon}/></Link></li>
              <li><Link href="linkedin.com/in/zaza-alaa"> <span className={styles.srOnly}>Visit linkedin website linkedin.com/in/zaza-alaa </span> <AiFillLinkedin className={styles.icon}/></Link></li>
              <li><Link href="https://github.com/Alaa-Z"> <span className={styles.srOnly}>Visit github website https://github.com/Alaa-Z </span>  <AiFillGithub className={styles.icon}/></Link></li>
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