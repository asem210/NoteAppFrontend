import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://noteappbackend-w6ry.onrender.com/notes'; 
export const notesService = {
  getById: async (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const userId = decoded.userId; 

      const { data } = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching note:', error);
      return null; 
    }
  },
  deleteById: async (note_id: number, token: string) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${note_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error('Error deleting note:', error);
      return null; 
    }
  },
  update:async(note_id:number,token:string,is_archived:boolean)=>{
    try {
      const { data } = await axios.put(`${BASE_URL}/${note_id}`, 
        {
          is_archived,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('Error deleting note:', error);
      return null;
    }
  },
  edit:async(note_id:number,token:string, title:string, content:string)=>{
    try {
      const { data } = await axios.put(`${BASE_URL}/${note_id}`, 
        {
          title,
          content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('Error deleting note:', error);
      return null;
    }
  },
  create: async(token:string, title:string,content:string)=>{
    try {
      const { data } = await axios.post(`${BASE_URL}/`, 
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error('Error deleting note:', error);
      return null;
    }
  }
  
};
