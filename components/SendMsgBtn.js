import Modal from 'react-modal';
import { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Routes
import { messagesEndPoint } from '../config/endpoints';

export default function SendMsgBtn({recipientId}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');

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
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setIsModalOpen(true)}> Connect </button>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>X</button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="content">Message:</label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={handleMessageChange}
          />
          <button type="submit">Send</button>
        </form>
      </Modal>
    </>
  );
}
