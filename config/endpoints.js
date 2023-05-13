const endPoint = process.env.ENDPOINT_URL

// REGISTER API
const registerEndPoint = `${endPoint}/user/register`;
// Log in API
const loginEndPoint = `${endPoint}/user/login`;
// ProfileEndPoint
const profileEndPoint = `${endPoint}/user/profile`;
// Logout 
const logoutEndPoint = `${endPoint}/user/logout`;

// admin  
const adminEndPoint = `${endPoint}/admin`;


// addBook
const addBookEndPoint = `${endPoint}/books/add`;
// delete book
const deleteBookEndPoint = `${endPoint}/books/delete`;
// all books 
const allBooksEndPoint = `${endPoint}/books`;
// edit book status 
const bookStatusEndPoint = `${endPoint}/books/status`;

const messagesEndPoint =`${endPoint}/user/messages`;

export {
    registerEndPoint,
    loginEndPoint, 
    profileEndPoint,
    logoutEndPoint,
    adminEndPoint,
    addBookEndPoint,
    deleteBookEndPoint,
    allBooksEndPoint,
    bookStatusEndPoint,
    messagesEndPoint
}