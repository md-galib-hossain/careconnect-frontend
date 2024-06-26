'use server';

import { authKey } from '@/constants/authKey';
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';
import { getUserInfo } from '../auth.services';
import { decodedToken } from '@/utils/jwt';
import { jwtDecode } from 'jwt-decode';

const setAccessToken =async (token: string, option?: any) => {
   cookies().set(authKey, token);
  
   if (option && option.passwordChangeRequired) {
      redirect('/dashboard/change-password');
   }
   if (option && !option.passwordChangeRequired && option.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;