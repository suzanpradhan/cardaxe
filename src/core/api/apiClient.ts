import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

export const apiConfig = {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  
  export const getHeaders = async () => {
    const session = await getServerSession(authOptions);
  
    const token = (session as any)?.user.accessToken as string;
    if (token) {
      (apiConfig as any)['headers']['authorization'] = `Bearer ${token}`;
    }
  
    return apiConfig;
  };

  export async function setHeaders(headers: Headers) {
    headers.set('Access-Control-Allow-Origin', '*');
    const session = await getSession();
  
    if (session) {
      const token = session?.user?.access;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
  
  
    headers.set('accept', 'application/json');
    return headers;
  }

  export async function setFormDataHeaders(headers: Headers) {
    const session = await Promise.resolve(await getSession());
    if (session) {
      const token = session.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
  
    headers.set('Content-Type', 'multipart/form-data');
    console.log(headers);
    // headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  }