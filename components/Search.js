import { useState } from 'react';

// Endpoint
import { allBooksEndPoint } from '../config/endpoints';

export default function Search() {

    // To store the books
    const [books, setBooks] = useState([]);
    // If books not nound 
    const [result, setResult] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault();
        // Take the serch word
        const searchWord = e.target.searchWord.value;
        const response = await fetch(`${allBooksEndPoint}/search/${searchWord}`);
        // console.log(response)
        const data = await response.json();
        // console.log(data)
        setBooks(data);
        setResult(data.length ? '' : 'Books Not Found');
        // Show result for 2 s
        setTimeout(() => {
            setResult('');
        }, 2000);

    };

    // back button
    const handleClear = () => {
        setBooks([]);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" name="searchWord" placeholder="Search for a book" />
                <button type="submit">Search</button>
                {books.length > 0 ? (
                <button type="button" onClick={handleClear}>X</button>
                ): null}
            </form>
            {books.length > 0 && (
                <ul>
                {books.map((book) => (
                <li key={book._id}>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.ISBN}</p>
                    <p>{book.user.name}</p>
                    <p>{book.user.address}</p>
                </li>
                ))}
                </ul>)}
                {result && (<p> {result}</p>) }
        </div>
    );
}
