import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';

import { loginEndPoint } from '../config/endpoints';

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error messages 
  const [error, setError] = useState('');

  // to handel the form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginEndPoint, {
          email,
          password,
      });
      // console.log(response.data)// represents token
      var {token} = response.data
      localStorage.setItem('auth-token', token);
      // decoding JWTs token
      var decoded = jwt_decode(token);
      // console.log(decoded)
      //if registration is successful
      setError('');
      // Navigate to profile page if the user is not admin
      if(decoded.isAdmin){
        router.push('/admin')
      }
      router.push('/profile')
    } catch (error) {
        if(error){
            console.log(error);
            setError(error.response.data);
            // show error message only for 3 seconds
            setTimeout(() => {
            setError('');
            }, 2000); 
        } 
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
          Email:
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      {/* if the messages exist show them */}
      {error && <p>{error}</p>}
    </form>
  );
}

  
export default LoginForm;
