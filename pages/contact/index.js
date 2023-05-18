
import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import useSWR from 'swr';

import MainLayout from '@/components/MainLayout'

import { MdArrowBackIos } from 'react-icons/md';
// Routes
import { adminEndPoint } from '../../config/endpoints';
import { messagesEndPoint } from '../../config/endpoints';

import { BsFillSendFill } from 'react-icons/bs';
import styles from '../../styles/contact.module.scss';

export default function contact () {

    const[token, SetToken]= useState("");
    // to ckeck if user is loggedin
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // to get adminID
    const [adminId, setAdminId] = useState('')

    //msg content 
    const [content, setContent] = useState('');

    // error and success messages 
    const [er, setEr] = useState('');
    const [success, setSuccess] = useState(false);

    // use it to setIsLoggedIn to true when user is loggedin
    useEffect(() => {
        if(Cookies.get('auth-token')){
        setIsLoggedIn(true);
        SetToken(Cookies.get('auth-token'))
    }
    },[]);
    // console.log("toekn is" + token)

    // use SWR Hooks for Data Fetching (only if the token exists)
    const { data, error } = useSWR(token ? `${adminEndPoint}/adminId` : null, async (url) => {
        const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
        });
        // in case of errors
        if (!res.ok) {
        throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        console.log(json)
        setAdminId(json.adminId);
        return json
    });


    // To send the message
    const handleMessageChange = (e) => {
        setContent(e.target.value);
    };

    // post request to send msg
    const handleSubmit = async (e) => {

        e.preventDefault();
        // const authToken = Cookies.get('auth-token');
        try {
        const response = await axios.post(`${messagesEndPoint}/${data.adminId}`, {
            content, 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            }
        });
        console.log(response.data);
        setSuccess(true);
        //clear the form
        setEr('');
        setContent('')
        } catch (error) {
        console.error(error);
        setSuccess(false);
        if(error.response.data){
            setEr(error.response.data);
        }
        // show error message only for 3 seconds
        setTimeout(() => {
        setEr('');
        }, 3000)
        }
    };

    return (
        <>
        <Head>
        <title>Contact admin page</title>
        </Head>
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.backBtn}>
                    <Link  href='/'>
                    <MdArrowBackIos/> Back 
                    </Link>
                </div>
                {!isLoggedIn ? (
                <div>
                    <p>Please log in first to send a message.</p>
                    <Link  className={`${styles.link}`} href="/login"> Login </Link>
                </div>
                ):
                <div className={styles.container} > 
                    <p> You can send a message to the administration in the form:</p>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label for="content" >Message:</label><br></br>
                        <textarea
                            type="text"
                            id="content"
                            value={content}
                            onChange={handleMessageChange}
                        >
                        </textarea>
                        <br></br>
                        <button type="submit"> Send <BsFillSendFill/></button>
                        {er && <p className={styles.error}>{er}</p>}
                        {success && <p className={styles.success}> Your message sent successfully!</p>}
                    </form>
            
                </div>}
          
                    
            </div>
        </MainLayout>
        </>
       
    )
}
