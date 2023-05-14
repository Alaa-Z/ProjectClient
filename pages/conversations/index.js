import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

// Endpoints

import { messagesEndPoint } from '../../config/endpoints';
import MainLayout from '@/components/MainLayout';

import styles from '../../styles/allConversations.module.scss';

export default function allConversations() {

  // to get token
  const [token, setToken] = useState(null);
  // to get current user id 
  const [user1Id, setUser1Id] = useState(null);

  useEffect(() => {
    const authToken = Cookies.get('auth-token');
    if (!authToken) {
      router.push('/login');
    } else {
      setToken(authToken);
      const decodedToken = jwt_decode(authToken);
      setUser1Id(decodedToken._id);
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
        ) : null}
        {!data ? (
          <div>Loading</div>
        ) : (
          <div>
            <h1 className={styles.h1}>Chats</h1>
            <ul className={styles.list}>
              {data.map((conversation) => {
                // which name to show 
                const otherUserIndex = conversation.users.findIndex((user) => user._id !== user1Id);
                const otherUserName = conversation.users[otherUserIndex].name;
                return (
                  <li key={conversation._id} className={styles.listItem}>
                    <div className={styles.listItemDiv}>
                      <div className={styles.iconImg}></div>
                      <div className={styles.msg}>
                        <Link href={`/conversations/${conversation._id}`} className={styles.link}>
                          {/* Show sender name */}
                          <div>
                            <p className={styles.msgSender}>
                              <b>{otherUserName}</b>
                            </p>
                            <p className={styles.msgBody}>
                              {/* Show the last sender and msg in the conversation */}
                              {conversation.messages[conversation.messages.length - 1].sender.name}:&nbsp;
                              {conversation.messages[conversation.messages.length - 1].content}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </MainLayout>
    </div>
  );
  }
