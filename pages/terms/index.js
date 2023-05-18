
import Head from 'next/head'
import Link from 'next/link';
import MainLayout from '@/components/MainLayout'

import styles from '../../styles/Terms.module.scss'
import { MdArrowBackIos } from 'react-icons/md';

export default function Terms () {
    return (
        <>
        <Head>
        <title>Terms and conditions page</title>
        </Head>
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.backBtn}>
                    <Link  href='/register'>
                    <MdArrowBackIos/> Back 
                    </Link>
                </div>
                <p> Registration Terms:</p>
                <ul>
                    <li>
                    <b>Sharing: </b>By registering on this platform, you agree to participate in a community where everybody shares their books and knowledg. Remember that it's a way to help each other and reduce costs
                    </li>
                    <li>
                    <b> Respect: </b>As a member, you commit to treating others with respect and kindness. This includes being considerate when borrowing materials and returning them on time.
                    </li>
                    <li>
                    <b>Responsibility: </b>  You are responsible for the materials you borrow. Take care of them and return them in the same condition as you received them.
                    </li>
                    <li>
                    <b>Collaboration: </b> Use this platform to connect with fellow users, exchange study resources, and build a supportive network. Together, we can create a positive learning environment.
                    </li>
                    <li>
                    <b> Compliance: </b>You agree to follow the platform's guidelines and policies. This ensures a fair and secure experience for all users.
                    </li>
                </ul>
                <p> By registering, you acknowledge and accept these conditions. Let's foster a culture of sharing and collaboration!</p>
            </div>
        </MainLayout>
        </>
       
    )
}
