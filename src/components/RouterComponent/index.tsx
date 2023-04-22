import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Header from '../Header';

import Home from '../../pages/Home';
import ProdutoDetalhes from '../../pages/ProdutoDetalhes';
import ProdutoListagem from '../../pages/ProdutoListagem';
import Carrinho from '../../pages/Carrinho';
import Login from '../../pages/Login';
import Context from '../../context/Context';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default function RouterComponent() {
  const { setConfigs, setGruposAjuda }: any = useContext(Context);

  async function getConfig() {
    try {
      const response = await api.get('/configs');

      if (response.status === 200) {
        setConfigs(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar configs: ' + error.message);
    }
  }

  async function getGruposAjuda() {
    try {
      const response = await api.get('/gruposajuda');

      if (response.status === 200) {
        setGruposAjuda(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar grupos de ajuda: ' + error.message);
    }
  }

  useEffect(() => {
    getConfig();
    getGruposAjuda();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/produtoDetalhes/:codbar' element={<ProdutoDetalhes />} />
          <Route path='/produtoListagem' element={<ProdutoListagem />} />
        </Route>
        <Route>
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
