import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { adminEndPoint } from '../../config/endpoints';
// Components
import LogoutButton from '../../components/LogoutButton';

function admin() {
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
  const { data, error } = useSWR(token ? adminEndPoint : null, async (url) => {
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
    // covert to a JSON object.
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
        <title>Admin</title>
      </Head>
      {/* render admin info */}
      <h1>This is the admin: {data.admin.name} page</h1>
      <p>Email: {data.admin.email}</p>
      <h2>List of Users:</h2>
      <ul>
        {data.users.map((user) => {
          // render all users but not the admin
          if (user._id !== data.admin._id) {
            return <li key={user._id}>{user.name} ({user.email})</li>;
          } else {
            return null; 
          }
        })}
      </ul>
      <LogoutButton />
    </div>
  );
}

export default admin;
