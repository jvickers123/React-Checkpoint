import axios, { AxiosError } from 'axios';

export const getAllItems = async (path: string = 'products') => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/${path}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.message);
  }
};
