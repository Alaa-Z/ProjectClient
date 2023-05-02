import { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
// Style 
import styles from '../styles/LoginFrom.module.scss'

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
      // save token in Cookies
      Cookies.set('auth-token', token, { expires: 1 });
      // console.log(token);
      // decoding JWTs token
      var decoded = jwt_decode(token);
      // console.log(decoded)
      //if registration is successful
      setError('');
      // Navigate to profile page if the user is not admin
      if (decoded.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
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
    <div className={styles.container}>
      <h2> Login To Continue</h2>
      <form className={styles.form} onSubmit={handleSubmit} >
        <div className={styles.inputField}> 
          <label className={styles.label}>
            E-mail:
          </label>
          <br></br>
          <input type="email" placeholder="Enter Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className={styles.inputField}> 
          <label className={styles.label}>
            Password:
          </label>
          <br></br>
          <input type="password"
            value={password} 
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)} />
          </div>
         <button type="submit">Login</button>
       {/* if the messages exist show them */}
      {error && <p>{error}</p>}
    </form>
  </div>
   
  );
}

  
export default LoginForm;
