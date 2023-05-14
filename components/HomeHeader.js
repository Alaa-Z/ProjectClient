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
                    <h2> With BookShare you can easily share and borrow books with other users </h2>
                    <p> Join us today and become part of our community!</p>
                    <Search />
                </div>
            </div>
      </div>
    : null
  );
}
