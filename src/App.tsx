import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import RouterComponent from './components/RouterComponent';

import { GlobalStyles } from './styles/GlobalStyles';

import Context, { ICarrinho, IContext, IDadosLogin, IListaDesejo, IRodape } from './context/Context';
import ErrorPage from './pages/ErrorPage';

import KilarPublicidadeScript from './components/KilarPublicidadeScript';
import api from './services/api';

function App() {
  const [configs, setConfigs] = useState([]);
  const [rodape, setRodape] = useState<IRodape[]>([]);
  const [carrinho, setCarrinho] = useState<ICarrinho[]>([]);
  const [listaDesejos, setListaDesejos] = useState<IListaDesejo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [dadosLogin, setDadosLogin] = useState<IDadosLogin>({
    id: 0, endUsu: [], username: '',
    password: '', raz: '', ema: '',
  });

  const contextValues: IContext = {
    configs, setConfigs, rodape, setRodape,
    carrinho, setCarrinho, dadosLogin,
    setDadosLogin, listaDesejos, setListaDesejos,
    isLoading, setIsLoading, error, setError
  };

  window.document.title = import.meta.env.VITE_TITLE;

  async function verificaUsuarioLogado() {
    try {
      const dadosLoginCookie = Cookies.get('@dadosLogin');

      if (dadosLoginCookie) {
        const dadosLogin = JSON.parse(dadosLoginCookie);
        if (!dadosLogin?.ema || !dadosLogin?.password) {
          throw Error('Credenciais inválidas.');
        }

        const response = await api.get(`/usuarios/loginProvisorio?email=${dadosLogin?.ema}&password=${dadosLogin?.password}`);

        if (response.status === 200) {
          if (response.data.length === 0) {
            throw Error('Usuário/Senha não encontrado.');
          }
          const dadLogin = response.data;

          setDadosLogin(response.data);
          Cookies.set('@dadosLogin', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        }
      }

    } catch (error: any) {
      Cookies.remove('@dadosLogin', { domain: window.location.hostname });
    }
  }

  useEffect(() => {
    verificaUsuarioLogado();
  }, []);

  //Nome da aba do navegador fica alternando entre nome da empresa e mensagem quando usuário está fora do site.
  useEffect(() => {
    let intervaloTitle: any;

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        intervaloTitle = setInterval(() => {
          window.document.title = document.title === import.meta.env.VITE_TITLE ? 'Seus produtos te aguardam 😍' : import.meta.env.VITE_TITLE;
        }, 1000);
        return;
      }
      clearInterval(intervaloTitle);
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
        {import.meta.env.VITE_API_URL === 'https://killar-api.herokuapp.com/api' && <KilarPublicidadeScript />}
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
