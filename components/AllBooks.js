import useSWR from 'swr';
import { allBooksEndPoint } from '../config/endpoints';
// import styles 
import styles from '../styles/AllBooks.module.scss'
import {GoLocation} from 'react-icons/go';
import { useRouter } from 'next/router';

import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

import SendMsgBtn from './SendMsgBtn';
import { useState, useEffect } from 'react';


export default function AllBooks() {

    const [authToken, setAuthToken] = useState('');
    const[loggedInUserID, setLoggedInUserID] = useState(null)

    const router = useRouter();
    // Define which page is rendering 
    const isHomepage  = router.pathname === '/';

    // use SWR Hooks for Data Fetching
    const { data, error } = useSWR(allBooksEndPoint, async (url) => {
        const res = await fetch(url);
        // console.log(res);
        const json = await res.json();
        console.log(data);
        return json;
    });

    useEffect(() => {
        setAuthToken(Cookies.get('auth-token'));
        if(Cookies.get('auth-token')){
            const decoded= jwt_decode(Cookies.get('auth-token'));
            setLoggedInUserID(decoded._id)
            console.log(decoded)
        }
    }, []);


    if (error) return <div>Error loading books.</div>;
    if (!data) return <div>Loading books...</div>;
    
    // Render 4 books in the home page
    const booksNumber = isHomepage ? data.slice(0, 4) : data;

    



    return (
        <div className={styles.container}>
            <ul>
            {booksNumber.map((book) => (
                <li key={book._id}>
                    <p className={styles.name}> {book.title} by {book.author} </p>
                    <p className={styles.palce}> <b> Status:</b>  <span className={book.available  ? "status1" : "status2"}>  {book.available ? ("Available"): ("Not available")}  </span></p>
                    <div className={styles.ownerDiv} >
                        <p className={styles.owner}><i>Added by: {book.user.name} </i></p>
                        <p>  <GoLocation className={styles.locationIcon} />  {book.user.address} </p>
                        {book.user._id !== loggedInUserID && (
                            <SendMsgBtn
                            recipientId={book.user._id}
                            recipientName={book.user.name}
                            />
                        )}
                    </div>
                </li>
            ))}
            </ul>
      </div>
    )
} 