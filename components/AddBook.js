import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { addBookEndPoint } from '../config/endpoints';

// Style 
import styles from '../styles/AddBook.module.scss'

import { ImBook } from 'react-icons/im';


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
        
        //console.log(response)
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
            console.log(error.response);
            setSuccess(false);
            setError(error.response.data);
            // show error message only for 3 seconds
            setTimeout(() => {
            setError('');
            }, 3000); 
        } 
     }
   };
   return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h1> Add <ImBook/> </h1>
        <label>
            Title<span>*</span>
        </label>
        <input className={styles.input} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>
        <label>
            Author<span>*</span>
        </label>
        <input className={styles.input} type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br></br>
        <label>
            ISBN<span>*</span>
        </label>
        <input className={styles.input} type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} />
        <br></br>
        <button className={styles.btn} type="submit"> + </button>
        {/* if the messages exist show them */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Book added successfully!</p>}
     </form>
   );
}
  
export default AddBook;
