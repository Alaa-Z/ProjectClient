import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'

import { registerEndPoint } from '../config/endpoints';


function RegisterForm() {

  // create a user 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [place, setPlace] = useState(null);
  // reference to an input  
  const inputRef = useRef(null);

  // error and success messages 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['geocode'],
      fields: ['place_id', 'formatted_address', 'geometry.location'],
    });
  
    // Update the state variable when a place is selected
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setPlace(place);
    });
  }, []);
  
  // to handel the form submit 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(registerEndPoint, {
      name,
      email,
      password,
      address,
      latitude: place ? place.geometry.location.lat() : null,
      longitude: place ? place.geometry.location.lng() : null,
    });
    //if registration is successful
    setSuccess(true);
    setError('');
  } catch (error) {
    if(error){
        console.log(error);
        setSuccess(false);
        setError(error.response.data);
        // show error message only for 3 seconds
        setTimeout(() => {
        setError('');
        }, 2000); 
    } 
  }
};
  return (
    <>
    <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places` }
          async
        >
        </script>
      </Head>
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
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} ref={inputRef} />
        </label>
        <button type="submit">Register</button>
        {/* if the messages exist show them */}
        {error && <p>{error}</p>}
        {success && <p>User added successfully!</p>}
      </form>
    </>
  );
}

  
export default RegisterForm;
