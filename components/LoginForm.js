import { useState } from 'react';
import axios from 'axios';

import { loginEndPoint } from '../config/endpoints';

function LoginForm() {
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
      console.log(response)
      console.log(response.data)
      //if registration is successful
      setError('');
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
