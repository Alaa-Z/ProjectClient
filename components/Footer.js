import styles from '../styles/Footer.module.scss'
import { MdEmail } from 'react-icons/md';


export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.content}>
            <h3>Lorem ipsum dolor </h3>
            <p>Lorem ipsum dolor Lorem ipsum dolor s</p>
            <ul className={styles.socials}>
              <li><a href="#"> <MdEmail className={styles.icon}/></a></li>
              <li><a href="#"> <MdEmail className={styles.icon}/></a></li>
              <li><a href="#"> <MdEmail className={styles.icon}/></a></li>
              <li><a href="#"> <MdEmail className={styles.icon}/></a></li>
            </ul>
        </div>
        <div className={styles.footerBottom}>
            <p>copyright &copy; <a href="#">Alaa Zaza</a>  </p>
              <div className={styles.menu}>
                <ul>
                  <li><a href="">Home</a></li>
                  <li><a href="">About</a></li>
                  <li><a href="">About</a></li>
                  <li><a href="">About</a></li>
                </ul>
              </div>
        </div>
      </footer>
    )
} 