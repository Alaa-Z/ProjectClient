import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link';

import { registerEndPoint } from '../config/endpoints';
// Style 
import styles from '../styles/RegisterForm.module.scss'
// Icons
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill} from 'react-icons/ri';
import {MdDriveFileRenameOutline} from 'react-icons/md';
import {GoLocation} from 'react-icons/go';

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
const placesLibrary = ['places'];

function RegisterForm() {
  // create a user 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [searchResult, setSearchResult] = useState("Result: none");
  const [address, setAddress] = useState('');

  // error and success messages 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // reference to the autocomplete input element
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: placesLibrary
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      // console.log(place)
      // console.log(place.name)
      setAddress(place.name)
      const lat = place.geometry.location.lat;
      const lon = place.geometry.location.lng;
      setLatitude(lat);
      setLongitude(lon);
    } else {
      alert("Please enter text");
    }
  }

  // to handel the form submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!address){
      setError("Something went wrong! Please refresh the page and try again after a while");
      return;
    }
    try {
      const response = await axios.post(registerEndPoint, {
        name,
        email,
        password,
        address,
        latitude,
        longitude
      });
      console.log(response)
      //if registration is successful
      setSuccess(true);
      //clear the form
      setName('')
      setPassword('')
      setEmail('');
      setAddress('')
      setSearchResult('')
      setError('');
    } catch (error) {
      if(error){
          console.log(error);
          setSuccess(false);
          if(error.response.data){
            setError(error.response.data);
          }
          // show error message only for 3 seconds
          setTimeout(() => {
          setError('');
          }, 3000); 
      } 
    }
  };
  return (
    <>
    <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&v=3.42` }
          async
        >
        </script>
      </Head>
      <div className={styles.container}>
      <h2> Create An Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputField}> 
            <label className={styles.label}>
              Name:
            </label>
            <br></br>
            {name ? null : <MdDriveFileRenameOutline className={styles.icon}  />}
            <input type="text" placeholder="Enter your name"
            value={name}            
            onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputField}> 
            <label className={styles.label}>
              Email:
            </label>
            <br></br>
            {email ? null : <MdEmail className={styles.icon}  />}
            <input type="email" placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div className={styles.inputField}> 
            <label className={styles.label}>
              Password:
            </label>
            <br></br>
            {password ? null : <RiLockPasswordFill className={styles.icon}  />}
            {password ?  <span> Password length must be at least 6 characters long </span>  : null}
            <input type="password"
              value={password} 
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br></br>
          <div className={styles.inputField}> 
            <label className={styles.label}>
            Address:
            </label>
            <br></br>
            <GoLocation className={styles.icon}  />
            <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
              <input
                type="text"
                placeholder="Enter a city name only using autocomplete!"
                required="true"
                style={{ paddingLeft: '30px' }}
              />
            </Autocomplete>
          </div>

          <button type="submit">Register</button>
          {/* if the messages exist show them */}
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>User added successfully!</p>}
        </form>
        <div className={styles.signup}>
          Already a Member? <Link href="/login"> Login </Link>
        </div>
        </div>
        
    </>
  );
}

export default RegisterForm;