// style
import Instruction from '@/components/Instruction'
import styles from '../../styles/about.module.scss'
import Head from 'next/head';
import MainLayout from '@/components/MainLayout';

export default function about() {
    return (
        <>
        <Head>
            <title>Books</title>
        </Head>
        <MainLayout>
            <section  className={styles.container}>
                <h1> About BookShare</h1>
                <p> BookShare platform is designed to help users easily share and borrow books from each other.
                We understand that accessing course materials can be expensive and challenging, which is why we have created a user-friendly solution that enables students to connect and support one another</p>
                <p> With BookShare, you can create an acount, view all the books added to the website by other users, and connect with the user who added the book by sending  a message to arrange a meeting or exchange. This way, you can not only access the materials you need, but also build relationships with fellow students and contribute to a more sustainable approach to education.</p>
                <h2> How to BookShare</h2>
                <div className={styles.inst}>
                    <Instruction  />
                </div>
                <p className={styles.center}>"Join us today and become part of our community!"</p>
            </section>
        </MainLayout>
        </>
    )
}