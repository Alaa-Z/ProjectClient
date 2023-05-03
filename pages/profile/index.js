import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { profileEndPoint } from '../../config/endpoints';
// Components
import AddBook from '@/components/AddBook';
import DeleteBook from '@/components/DeleteBook';
import MainLayout from '@/components/MainLayout'; 
import AllBooks from '@/components/AllBooks';
import EditStatusBtn from '@/components/EditStatusBtn';
// style
import styles from '../../styles/profile.module.scss'

function Profile() {
  const router = useRouter();
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
  const { data, error, mutate } = useSWR(token ? profileEndPoint : null, async (url) => {
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
    //covert to a JSON object.
    const json = await res.json();
    console.log(json)
    return json;
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const AddedBook = () => {
    // mutate function used to fetch the data again from server 
    mutate();
  };

  return (
    <div>
      <Head>
        <title>Profile page</title>
      </Head>
      <MainLayout>
        <h1 className={styles.h1}>Hi {data.name}!</h1>
        {/* <p>Email: {data.email}</p>
        <p>Address: {data.address}</p> */}
        <div className={styles.container}>
          <div className={styles.item}>
            <AddBook AddedBook={AddedBook} />
          </div>

          <div className={styles.item}>
            <div className={styles.itemDiv}>
              <h1>{data.name} Books: </h1>
              <ol>
                {data.books.map((book) => {
                  console.log(book.available)
                  // display all books
                  return <li key={book._id}>
                    <span> {book.title} by {book.author}</span>
                    <span> 
                      {!book.available ? (
                        <span>Status: Available</span>
                      ) : (
                        <span>Status: Not available</span>
                      )} 
                      <br></br> <br></br>
                      <EditStatusBtn
                        AddedBook={AddedBook}  
                        id={book._id} 
                      />
                    </span>
                    <span> 
                      <DeleteBook
                      AddedBook={AddedBook}  
                      id={book._id} 
                    />
                    </span>
                  </li>;
                })}
              </ol>
            </div>

            <div className={styles.itemDiv} >
              <h1 className="h1-heading"> Latest Added Books </h1>
              <AllBooks />
            </div>
          </div>
          <div className={styles.item}>
            Div to work with messages here!
          </div>

        </div>
        
      </MainLayout>
    </div>
  );
}

export default Profile;
