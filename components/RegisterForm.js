import { useState } from 'react';
import axios from 'axios';

// endpoint
import { registerEndpoint } from '../config/apiEndpoints';

function RegisterForm() {
  // To create user 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // error and success messages 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // to handel the form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(registerEndpoint, {
        name,
        email,
        password,
      });

      //if registration is successful
      setSuccess(true);
      setError('');
    } catch (error) {
      // console.log(error);
      setSuccess(false);
      setError(error.response.data);
      // show error message only for 3 seconds
      setTimeout(() => {
        setError('');
      }, 2000); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
        {/* if the messages exist show them */}
        {error && <p>{error}</p>}
        {success && <p>User added successfully!</p>}
    </form>
  );
}

export default RegisterForm;
