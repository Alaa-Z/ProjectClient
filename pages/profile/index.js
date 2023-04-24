import Head from 'next/head';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import {profileEndPoint} from '../../config/endpoints'
// Components
import LogoutButton from '../../components/LogoutButton';

function Profile() {
  const router = useRouter();

  // use SWR Hooks for Data Fetching
  const { data, error } = useSWR(profileEndPoint, async (url) => {
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
      <LogoutButton />
    </div>
  );
} 

export default Profile;
