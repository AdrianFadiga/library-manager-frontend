import axios, { AxiosRequestConfig } from 'axios';
import { IResponseAPI } from '../Interfaces';

export const requestAPI = async <T> (method: string, data: any, url: string, headers?: any): Promise<IResponseAPI<T>> => {
  const optionsRequest = {method, data, url, headers};
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const newOptions = { ...optionsRequest, url: `${BASE_URL}/${optionsRequest.url}` };
  try {
    const response = await axios(newOptions);
    return {data: response.data, status: response.status};
  }
  catch (err: any) {
    const {data, status} = err.response;
    throw {data, status};
  }



};