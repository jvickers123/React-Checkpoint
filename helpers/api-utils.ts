import axios, { AxiosError } from 'axios';

export const getAllItems = async (item: string) => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/${item}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.message);
  }
};

export const getSingleItem = async (item: string, id: number) => {
  try {
    const { data } = await axios.get(`https://fakestoreapi.com/${item}/${id}`);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.message);
  }
};
