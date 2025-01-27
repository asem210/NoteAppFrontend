import axios from 'axios';

const BASE_URL = 'https://noteappbackend-w6ry.onrender.com';
export const authService = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(data)
      return data; 
    } catch (error) {
      return null; 
    }
  },

  validateToken: async (token: string) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      return data; 
    } catch (error) {
      return null;
    }
  },

}