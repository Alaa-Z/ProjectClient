import useSWR from 'swr';
import { allBooksEndPoint } from '../config/endpoints';
// import styles 
import styles from '../styles/AllBooks.module.scss'
import { GiBookCover } from 'react-icons/gi';

import {GoLocation} from 'react-icons/go';

import { useRouter } from 'next/router';
import SendMsgBtn from './SendMsgBtn';


export default function AllBooks() {

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

    if (error) return <div>Error loading books.</div>;
    if (!data) return <div>Loading books...</div>;
    
    // Render 4 books in the home page
    const booksNumber = isHomepage ? data.slice(0, 4) : data;

    return (
        <div className={styles.container}>
            <ul>
            {booksNumber.map((book) => (
                <li key={book._id}>
                    {/* <GiBookCover className={styles.bookIcon} /> */}
                    <p className={styles.name}> {book.title} by {book.author} </p>
                    <div className={styles.ownerDiv} >
                        <p className={styles.owner}><i>Owner: {book.user.name} </i></p>
                        <SendMsgBtn
                            recipientId= {book.user._id}
                            recipientName= {book.user.name}
                        />
                    </div>
                    <p>  <GoLocation className={styles.locationIcon} />  {book.user.address} </p>
                    <p><b> Status:</b> {book.available ? ("Available"): ("Loaned")} </p>
                </li>
            ))}
            </ul>
      </div>
    )
} 