import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { adminEndPoint } from '../../config/endpoints';
// Components
import LogoutButton from '../../components/LogoutButton';
import MainLayout from '@/components/MainLayout';
// style
import styles from '../../styles/admin.module.scss'

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
    console.log(json)

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
      <MainLayout>
        {/* render admin info */}
        <h1>Admin {data.admin.name} page</h1>
        <h2>List of All Users:</h2>
        <div className={styles.container}>
          <div className={styles.tableContainer}>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Books</th>
                </tr>
                {data.users.map((user) => {
                  return user._id !== data.admin._id ? (
                    <tr key={user._id} >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>
                        <ol>
                          {user.books.map((book) => (
                            <li key={book.id}>{book.title}</li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}  



        


export default admin;
