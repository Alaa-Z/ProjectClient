import useSWR from 'swr';
import { allBooksEndPoint } from '../config/endpoints';
// import styles 
import styles from '../styles/AllBooks.module.scss'
import { GiBookCover } from 'react-icons/gi';

export default function AllBooks() {

    // use SWR Hooks for Data Fetching
    const { data, error } = useSWR(allBooksEndPoint, async (url) => {
        const res = await fetch(url);
        console.log(res);
        const json = await res.json();
        console.log(data);
        return json;
    });

    if (error) return <div>Error loading books.</div>;
    if (!data) return <div>Loading books...</div>;
    
    return (
        <div className={styles.container}>
            <ul>
            {data.map((book) => (
                <li key={book._id}>
                    <GiBookCover className={styles.icon} />
                    <p>{book.title} by {book.author} </p>
                    <br></br>
                    <p> Added by: {book.user.name} </p>
                </li>
            ))}
            </ul>
      </div>
    )
} 