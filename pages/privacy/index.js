
import Head from 'next/head'
import Link from 'next/link';
import MainLayout from '@/components/MainLayout'

import styles from '../../styles/privacy.module.scss'
import { MdArrowBackIos } from 'react-icons/md';

export default function privacy () {
    return (
        <>
        <Head>
        <title>Privacy Policy page</title>
        </Head>
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.backBtn}>
                    <Link  href='/register'>
                    <MdArrowBackIos/> Back 
                    </Link>
                </div>
                <p> Privacy Policy:</p>
                <ul>
                    <li>
                    <b>Information Collection: </b> We may collect personal information such as your name, email address, and location when you register an account. This information is necessary to create and manage your account effectively.
                    </li>
                    <li>
                    <b> How We Use Your Information:: </b>AWe use your information to help you connect with other students and share or borrow course materials. To make it easier for you to find materials nearby, we may show your name and location to other users. Rest assured, we will never share your email address with anyone without your permission.
                    </li>
                    <li>
                    <b>Protecting Your Data: </b>  We take the security of your personal information seriously. We have measures in place to keep your data safe from unauthorized access, changes, or sharing.
                    </li>
                    <li>
                    <b>How Long We Keep Your Data: </b> We keep your personal information for as long as needed to provide our services and fulfill legal requirements. If you decide to delete your account, just let us know, and we'll promptly remove your information from our system.
                    </li>
                    <li>
                    <b> Enhancing Your Experience with Cookies: </b>To improve your browsing experience, we may use cookies. These are small files stored on your device that help us enhance our platform's functionality and remember your preferences
                    </li>
                </ul>
                <p> We care about your privacy, and by using our platform, you agree to these privacy practices. If there are any changes to our policy, we'll let you know. If you have any questions or concerns, please reach out to us.</p>
            </div>
        </MainLayout>
        </>
       
    )
}
