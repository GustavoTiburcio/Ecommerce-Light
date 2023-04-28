import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RouterComponent from './components/RouterComponent';

import { GlobalStyles } from './styles/GlobalStyles';

import Context from './context/Context';

function App() {
  const [configs, setConfigs] = useState({});
  const [gruposAjuda, setGruposAjuda] = useState({});
  const [carrinho, setCarrinho] = useState([]);
  const [dadosLogin, setDadosLogin] = useState([]);

  window.document.title = import.meta.env.VITE_TITLE;

  useEffect(() => {
    const carrinho = localStorage.getItem('@Carrinho');
    if (carrinho) {
      setCarrinho(JSON.parse(carrinho));
    }
  }, []);

  return (
    <>
      <Context.Provider value={{ configs, setConfigs, gruposAjuda, setGruposAjuda, carrinho, setCarrinho, dadosLogin, setDadosLogin }}>
        <GlobalStyles />
        <ToastContainer
          position='top-right'
          theme='colored'
        />
        <RouterComponent />
      </Context.Provider>
    </>
  );
}

export default App;
