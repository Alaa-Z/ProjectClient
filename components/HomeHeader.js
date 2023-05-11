import Image from 'next/image'
import booksImg from '../public/books.jpg'
import { useRouter } from 'next/router';
// Style 
import styles from '../styles/HomeHeader.module.scss'

import Search from './Search';

export default function HomeHeader() {
  const router = useRouter();

  return (
    router.pathname === '/'
    ? <div className={styles.containerHeader}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <h2> Neque porro quisquam est qui dolorem ipsum porro quisquam est qui dolorem ipsum </h2>
                    <p> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                    <Search />
                </div>
            </div>
      </div>
    : null
  );
}
