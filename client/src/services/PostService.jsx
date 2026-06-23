// src/services/postService.js
import axios from 'axios';

const API_URL = '/api/posts';

export const submitNewPost = async (postData) => {
  const formData = new FormData();
  
  formData.append('contentType', postData.contentType);
  formData.append('caption', postData.caption || '');
  
  if (postData.tags) {
    formData.append('tags', postData.tags);
  }

  if (postData.file) {
    formData.append('file', postData.file); // Matches upload.single('file')
  }

  // 1. Fetch your authentication token out of storage
  // (Change 'token' to whatever key your login system saves it under, e.g., 'matrix_token')
  const token = localStorage.getItem('token'); 

  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 2. Attach the Authorization header so the 'protect' middleware accepts the user context
      'Authorization': token ? `Bearer ${token}` : ''
    },
  });

  return response.data;
};