import Cookies from 'js-cookie';
import { deleteBookEndPoint } from '../config/endpoints';

import { MdDelete } from 'react-icons/md';

function DeleteBook({id, AddedBook}) {

    const deleteBook = async () => {
        // get the token
        const authToken = Cookies.get('auth-token');
        if (!authToken) {
          return;
        }
        const response = await fetch(`${deleteBookEndPoint}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
          },
        });
    
        if (!response.ok) {
          console.error('Error in while deleting the book');
        } else {
            // update list again
          AddedBook();
        }
      };
    
      return (
        <button className="deleteBtn" onClick={deleteBook}><MdDelete/></button>
      );
    }
    
export default DeleteBook;
    
    
    
    
    
    
    


