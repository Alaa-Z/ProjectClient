import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link'

// Routes
import { messagesEndPoint } from '../config/endpoints';
// import styles 
import styles from '../styles/SendMsgBtn.module.scss'

// Icons
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillSendFill } from 'react-icons/bs';
// to fix react-modal: App element is not defined error 
Modal.setAppElement('body');


export default function SendMsgBtn({recipientId, recipientName}) {

  // to ckeck if user is loggedin
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');

  // error and success messages 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // use it to set setIsLoggedIn to true when user is loggedin
  useEffect(() => {
    if(Cookies.get('auth-token')){
      setIsLoggedIn(true)
    }
  },[]);

  // close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // To send the message
  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  // post request to send meg
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = Cookies.get('auth-token');
    try {
      const response = await axios.post(`${messagesEndPoint}/${recipientId}`, {
        content, 
      }, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
        }
      });
    
      console.log(response.data);
      setSuccess(true);
      //clear the form
      setError('');
      setContent('')
      // closeModal();
    } catch (error) {
      console.error(error);
      setSuccess(false);
          if(error.response.data){
            setError(error.response.data);
          }
          // show error message only for 3 seconds
          setTimeout(() => {
          setError('');
          }, 3000)
    }
  };

  return (
    <>
     <div>
        <button onClick={() => setIsModalOpen(true)}> Send a message </button>
      </div>

      {/* Change the modal content based on unser is logged in or not */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}  className={`${styles.modal}`}>
        {!isLoggedIn ? (
          <div>
            <button onClick={closeModal} className={`${styles.closeButton}`}>
            <AiFillCloseCircle/>
            </button>
            <p>Please log in first to send a message.</p>
            <Link  className={`${styles.link}`} href="/login"> Login </Link>
          </div>
        )
        : 
        <div>
        <button onClick={closeModal} className={`${styles.closeButton}`}>
          <AiFillCloseCircle/>
        </button>
        <form onSubmit={handleSubmit}>
          <p className={`${styles.to}`}>To: {recipientName} </p>
          <label htmlFor="content" className={`${styles.label}`} >Message:</label><br></br>
          <textarea
            type="text"
            id="content"
            value={content}
            onChange={handleMessageChange}
          >
          </textarea>
          <br></br>
          <button type="submit" className={`${styles.sendButton}`}> Send <BsFillSendFill/></button>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}> Your message sent successfully!</p>}
        </form> 
        </div>
        }
      </Modal>



     

    </>
  );
}
