import useSWR from 'swr';
import { allBooksEndPoint } from '../config/endpoints';

export default function AllBooks() {
    
    // use SWR Hooks for Data Fetching
    const { data, error } = useSWR(allBooksEndPoint, async (url) => {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    });

    if (error) return <div>Error loading books.</div>;
    if (!data) return <div>Loading books...</div>;
    
    return (
        <div>
            <ul>
            {data.map((book) => (
                <li key={book._id}>
                {book.title} by {book.author}
                </li>
            ))}
            </ul>
      </div>
    )
} 