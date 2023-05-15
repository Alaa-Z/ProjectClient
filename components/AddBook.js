import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { addBookEndPoint } from '../config/endpoints';

import Modal from 'react-modal';

import Instruction from './Instruction';
// Style 
import styles from '../styles/AddBook.module.scss'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';

Modal.setAppElement('body');


function AddBook({AddedBook}) {
    // create a book 
   const [title, setTitle] = useState('');
   const [author, setAuthor] = useState('');
   const [ISBN, setISBN] = useState('');

   // error and success messages 
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);

   // to open info  modal 
   const [isModalOpen, setIsModalOpen] = useState(false);


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

   // close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

   return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h1> Add books to your profile <span className={styles.mark} onClick={() => setIsModalOpen(true)} > <AiOutlineQuestionCircle/> </span> </h1>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}  className={`${styles.modal}`}>
            <button onClick={closeModal} className={`${styles.closeButton}`}>
            <AiFillCloseCircle/>
            </button>
            <Instruction />
        </Modal>
        <label for="title">
            Title<span>*</span>
        </label>
        <input id="title" className={styles.input} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>
        <label for="author">
            Author<span>*</span>
        </label>
        <input id="author" className={styles.input} type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br></br>
        <label for="isbn">
            ISBN<span>*</span>
        </label>
        <input id="isbn" className={styles.input} type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} />
        <br></br>
        <button className={styles.btn} type="submit"> + </button>
        {/* if the messages exist show them */}
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Book added successfully!</p>}
     </form>
   );
}
  
export default AddBook;
