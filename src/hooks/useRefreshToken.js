import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import Api from '@/api';
import { HandleCookies } from '@/lib/api';
import { logoutAsync } from '@/redux/auth';

export const useRefreshToken = (isAuthenticated) => {
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = HandleCookies.get('tokenPayload');

    if (!token || !isAuthenticated) {
      return;
    }

    if (token) {
      setAccessToken(token);
    }

    const { exp } = jwtDecode(token);
    const expiry = exp;

    const countdown = setInterval(async () => {
      const now = new Date().getTime() / 1000;

      if (now >= expiry) {
        clearInterval(countdown);

        try {
          const response = await Api.refreshToken({ token: accessToken }, { withCredentials: false });

          const { access_token } = response?.data?.attributes ?? {};
          await HandleCookies.set({ name: 'tokenPayload', value: access_token });
          setAccessToken(access_token);
        } catch (error) {
          dispatch(logoutAsync.request());
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [isAuthenticated, accessToken]);
};
