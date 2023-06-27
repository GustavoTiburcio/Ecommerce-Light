import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import RouterComponent from './components/RouterComponent';

import { GlobalStyles } from './styles/GlobalStyles';

import Context, { ICart, IContext, ILoginData, IWishList, IFooter, IConfigs } from './context/Context';
import ErrorPage from './pages/ErrorPage';

import api from './services/api';

function App() {
  const [configs, setConfigs] = useState<IConfigs[]>([]);
  const [footer, setFooter] = useState<IFooter[]>([]);
  const [cart, setCart] = useState<ICart[]>([]);
  const [wishList, setWishList] = useState<IWishList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [loginData, setLoginData] = useState<ILoginData>({
    id: 0, endUsu: [], username: '',
    password: '', raz: '', ema: '',
  });

  const contextValues: IContext = {
    configs, setConfigs, footer, setFooter,
    cart, setCart, loginData, setLoginData, wishList,
    setWishList, isLoading, setIsLoading, error, setError
  };

  window.document.title = import.meta.env.VITE_TITLE;

  async function UserAuth() {
    try {
      const loginDataCookie = Cookies.get('@loginData');

      if (loginDataCookie) {
        const dadosLogin = JSON.parse(loginDataCookie);
        if (!dadosLogin?.ema || !dadosLogin?.password) {
          throw Error('Invalid credentials.');
        }

        const response = await api.get(`/usuarios/loginProvisorio?email=${dadosLogin?.ema}&password=${dadosLogin?.password}`);

        if (response.status === 200) {
          if (response.data.length === 0) {
            throw Error('User/password not valid.');
          }
          const dadLogin = response.data;

          setLoginData(response.data);
          Cookies.set('@loginData', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        }
      }

    } catch (error: any) {
      Cookies.remove('@loginData', { domain: window.location.hostname });
    }
  }

  useEffect(() => {
    UserAuth();
  }, []);

  //Tab title effect on dismiss
  useEffect(() => {
    let titleInterval: any;

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        titleInterval = setInterval(() => {
          window.document.title = document.title === import.meta.env.VITE_TITLE ? 'Hey, come back here 😍' : import.meta.env.VITE_TITLE;
        }, 1000);
        return;
      }
      clearInterval(titleInterval);
      window.document.title = import.meta.env.VITE_TITLE;
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Context.Provider value={contextValues}>
        <GlobalStyles />
        <ToastContainer
          position='top-right'
          theme='colored'
        />
        {!error ?
          <RouterComponent /> :
          <ErrorPage error={error} />
        }
      </Context.Provider>
    </>
  );
}

export default App;
