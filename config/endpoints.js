
// REGISTER API
const registerEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/user/register`;
// Log in API
const loginEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/user/login`;
// ProfileEndPoint
const profileEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/user/profile`;
// Logout 
const logoutEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/user/logout`;

// admin  
const adminEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/admin`;


// addBook
const addBookEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/books/add`;
// delete book
const deleteBookEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/books/delete`;
// all books 
const allBooksEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/books`;
// edit book status 
const bookStatusEndPoint = `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/books/status`;

const messagesEndPoint =`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/user/messages`;

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