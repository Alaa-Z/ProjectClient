import Head from 'next/head';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

// Endpoints
import { messagesEndPoint } from '../../config/endpoints';

import MainLayout from '@/components/MainLayout';
// Style
import styles from '../../styles/allConversations.module.scss'

export default function allConversations() {

  // to get token
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authToken = Cookies.get('auth-token');
    if (!authToken) {
      router.push('/login');
    } else {
      setToken(authToken);
    }
  }, []);

  // use SWR Hooks for Data Fetching (only if the token exists)
  const { data, error } = useSWR(token ? messagesEndPoint : null, async (url) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
    console.log(res)
    // in case of errors
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    //covert to a JSON object.
    const json = await res.json();
    console.log(json)
    return json;
  });


    return (
        <div>
        <Head>
            <title>Conversation</title>
        </Head>
        <MainLayout>
        {error ? (
            <div>Error: {error.message}</div>
        ): null }

        {!data ? (
            <div>Loading</div>
        ):(
        <div>
            <h1 className={styles.h1} > Last conversations:</h1> 
            <ul className={styles.list}>
            {data.map(conversation => (
              <li key={conversation._id} className={styles.listItem}>
                <div className={styles.listItemDiv} >
                    <div className={styles.iconImg}> 
                    </div>

                    <div className={styles.msg}>
                      <Link href={`/conversations/${conversation._id}` }  className={styles.link}>
                        {/* Show sender name */}
                        <div>
                        <p className={styles.msgSender}> <b>{conversation.users[0].name}</b></p> 
                        {/* Show the last sender in the conversation */}
                        <p className={styles.msgBody}> {conversation.messages[conversation.messages.length - 1].sender.name}: &nbsp;
                        {/* Show the last message in the conversation */}
                        {conversation.messages[conversation.messages.length - 1].content} </p>
                        </div>
                      </Link>
                    </div>
                  
                </div>
                
        
              </li>
            ))}
            </ul>
        </div> )
        }
            
        </MainLayout>
        </div>    
    )
} 