import Cookies from 'js-cookie';
import { bookStatusEndPoint } from '../config/endpoints';
import { allBooksEndPoint } from '../config/endpoints';
import { useState, useEffect } from 'react';

function EditStatusBtn({id, AddedBook}) {

    // to store book status
    const [status, setStatus] = useState(null);

    const authToken = Cookies.get('auth-token');

    // use it to fetch book availability and use it in the button 
    useEffect(() => {
        const fetchData = async () => {
        const res =  await fetch(`${allBooksEndPoint}/${id}`, {
            method: 'GET',
        });
        const book = await res.json();
        setStatus( book.available); 
    };
    fetchData();
    AddedBook();
    });
    
    //  update staus function
    const updateStatus = async () => {
        // get the token
        if (!authToken) {
        return;
        }
        const response = await fetch(`${bookStatusEndPoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
        },
        });
        // console.log(response)
        if (!response.ok) {
        console.error('Error in while updating the status');
        } else {
        // update list again
        AddedBook();
    }
    };
    
      return (
        <button 
            className={ status ? "updateStatusBtn1" : "updateStatusBtn2" }
            onClick={updateStatus}>
            {status ? "Mark as available" : "Mark as loaned"}
        </button>
      );
    }
    
export default EditStatusBtn;
