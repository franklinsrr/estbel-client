'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as jose from 'jose';
import { useStore } from '@/store';

export const UseAuthWrapper: FC<PropsWithChildren> = ({ children }) => {
  const auth = useStore(state => state.auth);
  const setAuth = useStore(state => state.setAuth);
  const setAuthSync = useStore(state => state.setAuthSync);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('accessToken');

        if (storedToken && !auth) {
          const decodedToken = jose.decodeJwt(storedToken);

          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            const authData = {
              accessToken: storedToken,
              decodedToken: {
                sub: decodedToken.sub as string,
                iat: decodedToken.iat as number,
                exp: decodedToken.exp as number,
              },
            };
            setAuthSync(authData);
          }
        }
      } catch (error) {
        console.error('Error al inicializar el auth', error);
      }
    };

    initializeAuth();
  }, [setAuth, auth]);

  useEffect(() => {
    if (auth) {
      router.push('/dashboard');
    }
  }, [auth, router]);

  return <>{children}</>;
};
