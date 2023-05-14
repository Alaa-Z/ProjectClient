import AllBooks from "@/components/AllBooks";
import MainLayout from "@/components/MainLayout";
import Search from "@/components/Search";
import Head from 'next/head';
// style
import styles from '../../styles/book.module.scss'

export default function Book() {
    return (
        <div>
        <Head>
        <title>Books</title>
        </Head>
        <MainLayout>
            <Search />
            <div className={styles.allBooks}>
                <h1> Books Added on the website: </h1>
            <AllBooks />
            </div>
        </MainLayout>
        </div>    
    )
} 