import { useRouter } from 'next/router';
import { useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { logoutEndPoint } from '../config/endpoints';

const LogoutButton = ( {onLogout} ) => {
    const router = useRouter();
    // get token from Cookies
    const token = Cookies.get('auth-token');
    const handleLogout = useCallback(async () => {
    try {
        // Make a GET request to the logout endpoint to clear the auth token cookie
        await axios.get(logoutEndPoint, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            }
        });
        // Redirect to the login page
        Cookies.remove('auth-token');
        router.push('/login');
    } catch (error) {
        console.error(error);
    }
}, [router]);
return <a onClick={handleLogout}>Logout</a>
};

export default LogoutButton;
