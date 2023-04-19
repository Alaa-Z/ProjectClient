import axios from 'axios';
// endpoint
import { registerEndpoint } from '../../config/apiEndpoints';

export default async function handler(req, res) {
  // only post allowed 
  if (req.method === 'POST') {
    try {

      const { name, email, password } = req.body;
      // Call to register endpoint to register the user
      const response = await axios.post(registerEndpoint, { name, email, password });

      // Return the API response 
      res.status(response.status).json(response.data);
    } catch (error) {
      // console.error(error);
      // Return an error message 
      res.status(error.response.status || 500).json({ message: error.message });
    }
  } else {
    // error if the request method is not POST 
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
