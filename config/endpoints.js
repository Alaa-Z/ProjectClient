// REGISTER API
const registerEndPoint = 'http://localhost:5000/api/user/register';
// Log in API
const loginEndPoint = 'http://localhost:5000/api/user/login';
// ProfileEndPoint
const profileEndPoint = 'http://localhost:5000/api/user/profile';
// Logout 
const logoutEndPoint = 'http://localhost:5000/api/user/logout';

// admin  
const adminEndPoint = 'http://localhost:5000/api/admin';


// addBook
const addBookEndPoint = 'http://localhost:5000/api/books/add';
// delete book
const deleteBookEndPoint = 'http://localhost:5000/api/books/delete';
// all books 
const allBooksEndPoint = 'http://localhost:5000/api/books';


export {
    registerEndPoint,
    loginEndPoint, 
    profileEndPoint,
    logoutEndPoint,
    adminEndPoint,
    addBookEndPoint,
    deleteBookEndPoint,
    allBooksEndPoint
}