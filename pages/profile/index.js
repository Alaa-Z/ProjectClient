import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { profileEndPoint } from '../../config/endpoints';
// Components
import LogoutButton from '../../components/LogoutButton';
import AddBook from '@/components/AddBook';
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
  const { data, error } = useSWR(token ? profileEndPoint : null, async (url) => {
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
    // console.log(json)
    return json;
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Profile page</title>
      </Head>
      <h1>This is {data.name}'s Profile</h1>
      <p>Email: {data.email}</p>
      {data.books.map((book) => {
      // display all books
        return <li key={book._id}> {book.title} by {book.author} {book.ISBN}</li>;
      
      })}
      <br></br>
      <LogoutButton />
      <AddBook />
    </div>
  );
}

export default Profile;
