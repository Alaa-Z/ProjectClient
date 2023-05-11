import React from "react";

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

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function RegisterForm() {
  // create a user 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // get address from autocomplete
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [isTyping, setIsTyping] = useState(false);

  // error and success messages 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // To handle selection of the address
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    console.log(results)
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };
  
  
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
        latitude: coordinates.lat, 
        longitude: coordinates.lng
      });
      console.log(response)
      //if registration is successful
      setSuccess(true);
      //clear the form
      setName('')
      setPassword('')
      setEmail('');
      setAddress('')
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
            {isTyping ? null : <GoLocation className={styles.icon} />}
            <PlacesAutocomplete
              value={address}
              onChange={(value) => {
                setAddress(value);
                setIsTyping(true);
              }}
              onSelect={handleSelect}
              onBlur={() => setIsTyping(false)}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: "Type address" })} 
                style={{ paddingLeft: '30px' }}/>
              <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                  const style = {
                    // backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
            )}
            </PlacesAutocomplete>
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