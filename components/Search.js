import { useState, useRef } from 'react';
import Modal from 'react-modal';
import { allBooksEndPoint } from '../config/endpoints';

import styles from '../styles/Search.module.scss';

import SendMsgBtn from './SendMsgBtn';

// Icons
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import {GoLocation} from 'react-icons/go';

export default function Search() {
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState('');
  // Open modal to show search result
  const [isModalOpen, setIsModalOpen] = useState(false);
  // to clear thr input field
  const searchInputRef = useRef(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    const searchWord = e.target.searchWord.value;
    const response = await fetch(`${allBooksEndPoint}/search/${searchWord}`);
    const data = await response.json();
    setBooks(data);
    setResult(data.length ? '' : 'Books Not Found');
    setIsModalOpen(true);
    // setTimeout(() => {
    //   setResult('');
    // }, 3000);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    if (searchInputRef.current) {
        searchInputRef.current.value = '';
    } 
  };

  return (
    <div className={styles.container}>


        <form onSubmit={handleSearch}>
            <input
            className={styles.searchInput}
            type="text"
            name="searchWord"
            placeholder="Search for books by title, author or ISBN"
            ref={searchInputRef}
            />
            <button type="submit" className={styles.searchButton}>
            <BiSearchAlt2 />
            </button>
        </form>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Results"
            className={`${styles.modal}`}
            overlayClassName={styles.overlay}>
            <button onClick={closeModal} className={styles.closeButton}>
            <AiFillCloseCircle/>
            </button>
        
            {books.length > 0 ? (
            <ul className={styles.resultList}>
                {books.map((book) => (
                <li key={book._id} className={styles.listItem}> 
                    {/* <p className={styles.name}>{book.title}</p>
                    <p> By: {book.author}</p>
                    <p>ISBN: {book.ISBN}</p>
                    <p><i>Owner: {book.user.name} </i></p>
                    <p> <GoLocation className={styles.locationIcon} />  {book.user.address} </p>
                    <SendMsgBtn
                      recipientId= {book.user._id}
                      recipientName= {book.user.name}
                    /> */}
                    <p className={styles.name}> {book.title} by {book.author} </p>
                    <p className={styles.palce}> <b> Status:</b>  <span className={book.available  ? "status1" : "status2"}>  {book.available ? ("Available"): ("Not available")}  </span></p>
                    <div className={styles.ownerDiv} >
                        <p className={styles.owner}><i>Added by: {book.user.name} </i></p>
                        <p>  <GoLocation className={styles.locationIcon} />  {book.user.address} </p>
                        <SendMsgBtn
                          recipientId= {book.user._id}
                          recipientName= {book.user.name}
                        />
                    </div>
                </li>
                ))}
            </ul>
            ) : (
            <p className={styles.result}>{result}</p>
        )}
      </Modal>
    </div>
  );
}
