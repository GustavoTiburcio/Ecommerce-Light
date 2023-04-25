import React, { useEffect, useState, useContext } from 'react';
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
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const MainLayout = ({cel}: any) => (
  <>
    <Header />
    <FloatingWhatsApp
      phoneNumber={'55' + cel.replace(/\D/g, '')}
      accountName={import.meta.env.VITE_TITLE ?? ''}
      statusMessage={'Responde em poucos minutos'}
      chatMessage={'Olá! 🤝 \nComo podemos lhe ajudar?'}
      placeholder={'Digite sua mensagem'}
      allowClickAway
      allowEsc
      notification
      notificationDelay={60}
    />
    <Outlet />
  </>
);

const SubLayout = ({cel}: any) => (
  <>
    <FloatingWhatsApp
      phoneNumber={'55' + cel.replace(/\D/g, '')}
      accountName={import.meta.env.VITE_TITLE ?? ''}
      statusMessage={'Responde em poucos minutos'}
      chatMessage={'Olá! 🤝 \nComo podemos lhe ajudar?'}
      placeholder={'Digite sua mensagem'}
      allowClickAway
      allowEsc
      notification
      notificationDelay={60}
    />
    <Outlet />
  </>
);

export default function RouterComponent() {
  const { setConfigs, setGruposAjuda }: any = useContext(Context);
  const [numCel, setNumCel] = useState<string>('');

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

        if (response.data.length > 0) {
          const [grupoAjudaCel] = response.data.filter((config: any) => config.tipo === 'cel');

          if (grupoAjudaCel) {
            const { gruaju: cel } = grupoAjudaCel;
            setNumCel(cel ?? '');
          }

        }

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
        <Route element={<MainLayout cel={numCel} />}>
          <Route path='/' element={<Home />} />
          <Route path='/produtoDetalhes/:codbar' element={<ProdutoDetalhes />} />
          <Route path='/produtoListagem/:pesquisa' element={<ProdutoListagem />} />
        </Route>
        <Route element={<SubLayout cel={numCel} />}>
          <Route path='/carrinho' element={<Carrinho />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
