import axios from 'axios';
import { ErrorResponse } from '../types';

const baseURL = 'http://localhost:8000/';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postPatient = async (formData: FormData) => {
  try {
    const response = await api.post('/patients', formData);
    return response.data;
  } catch (error: unknown) {
    const typedError = error as ErrorResponse;
    throw typedError.response?.data?.message || 'An error occurred';
  }
};
