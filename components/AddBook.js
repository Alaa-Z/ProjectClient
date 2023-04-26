import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { addBookEndPoint } from '../config/endpoints';


function AddBook({AddedBook}) {
    // create a book 
   const [title, setTitle] = useState('');
   const [author, setAuthor] = useState('');
   const [ISBN, setISBN] = useState('');

   // error and success messages 
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);

   // to handel the form submit 
   const handleSubmit = async (e) => {
     e.preventDefault();
     const authToken = Cookies.get('auth-token');
     try {
        const response = await axios.post(addBookEndPoint, {
            title,
            author,
            ISBN, 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken,
            }
        });
        
       console.log(response)
       //if book is successfully posted
       setSuccess(true);
       setError('');

        // clear the form
        setTitle('');
        setAuthor('');
        setISBN('');
        // refetch data
        AddedBook(); 
    } catch (error) {
        if(error){
            console.log(error);
            setSuccess(false);
            setError(error.response.data.message);
            // show error message only for 3 seconds
            setTimeout(() => {
            setError('');
            }, 3000); 
        } 
     }
   };
   return (
    <form onSubmit={handleSubmit}>
        <p> Add a book: </p>
        <label>
            Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
            Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
            ISBN:
            <input type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} />
        </label>
        <button type="submit">Add a book</button>
        {/* if the messages exist show them */}
        {error && <p>{error}</p>}
        {success && <p>Book added successfully!</p>}
     </form>
   );
}
  
export default AddBook;
