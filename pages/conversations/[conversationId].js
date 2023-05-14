import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

//Routes
import { messagesEndPoint } from '../../config/endpoints';
// Style
import styles from '../../styles/Conversation.module.scss'
import { BsFillSendFill } from 'react-icons/bs';
import { MdArrowBackIos } from 'react-icons/md';


import MainLayout from '@/components/MainLayout';

export default function conversationDetails() {
  const router = useRouter();
  const { conversationId } = router.query;

  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  // error messages 
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const authToken = Cookies.get('auth-token');
    if (!authToken) {
      router.push('/login');
    } else {
      setToken(authToken);
    }
  }, []);

  // use SWR Hooks for Data Fetching (only if the token exists)
  const { data, error} = useSWR(token ? `${messagesEndPoint}/${conversationId}` : null, async (url) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    // in case of errors
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    setMessage('')
    //covert to a JSON object.
    const json = await res.json();
    // console.log(json)
    return json;
  });

  
  const recipientId = data ? data.users[0]._id : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${messagesEndPoint}/${recipientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ content: message }),
      });
      // Handle errors from the server
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
     
    } catch (error) {
      console.log(error);
      console.log(error);
      setErrorMsg('Please enter your message');
            // show error message only for 3 seconds
            setTimeout(() => {
            setErrorMsg('');
            }, 2000); 
    }
  };


  return (
    <div>
      <Head>
        <title>messages</title>
      </Head>
      <MainLayout>
        {error ? (
          <div>Error: {error.message}</div>
        ) : null}
        {!data ? (
          <div>Loading</div>
        ) : (
          <div>
            <div>
              <div className={styles.backBtn}>
                <Link  href='/conversations'>
                <MdArrowBackIos/> Back 
                </Link>
              </div>
              <ul className={styles.list}>
                {data.messages.map(msg => {
                  // Change the class name based on user
                  const messageClass = msg.sender._id === recipientId ? styles.left : styles.right;
                  const text = msg.sender._id === recipientId ? styles.textleft : styles.textright;
                  return (
                    <li key={msg._id} className={styles.listItem}>
                        <div className={`${messageClass} ${styles.message}`}>
                          <div className={`${text}`}>
                            <p  className={styles.sender}> <b>{msg.sender.name}:</b></p><b></b>
                            <p>{msg.content}</p>
                            <p className={styles.date}>{new Date(msg.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric'})}</p>
                          </div> 
                      </div>
                    </li>
                  );
                })}
              </ul> 
            </div>
            <form onSubmit={handleSubmit} className={styles.form} >
              <textarea
                type="text"
                placeholder='Reply'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              >
              </textarea>  
              <br></br>
              <button className={styles.btn} type="submit"> <BsFillSendFill/> Send</button>

              {errorMsg && <div>Error: {errorMsg}</div>}
              
            </form>
            <div>
             
            </div>
          </div>
        )}
      </MainLayout>
    </div>
  );
}


