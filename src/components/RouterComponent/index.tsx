import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Header from '../Header';
import Context, { ICarrinho, IContext } from '../../context/Context';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import AvatarWhatsApp from '../../assets/images/avatar_whatsapp.png';
import Loader from '../Loader';

//pages
import Home from '../../pages/Home';
import Rodape from '../../pages/Rodape';
import ProdutoDetalhes, { postItemCarrinho } from '../../pages/ProdutoDetalhes';
import ProdutoListagem from '../../pages/ProdutoListagem';
import Carrinho from '../../pages/Carrinho';
import Login from '../../pages/Login';
import ErrorPage from '../../pages/ErrorPage';
import PainelDeUsuario from '../../pages/PainelDeUsuario';
import FinalizarCarrinho from '../../pages/FinalizarCarrinho';
import PedidoFinalizado from '../../pages/PedidoFinalizado';

function LayoutFixo({ cel, headerVisible }: { cel: string, headerVisible?: boolean }) {
  return (
    <>
      {headerVisible && <Header />}
      <FloatingWhatsApp
        phoneNumber={'55' + cel.replace(/\D/g, '')}
        accountName={import.meta.env.VITE_TITLE ?? ''}
        statusMessage={'Responde em poucos minutos'}
        chatMessage={'Olá! 🤝 \nComo podemos lhe ajudar?'}
        defaultMessage={'Olá!! Vim pelo site, '}
        placeholder={'Digite sua mensagem'}
        allowClickAway
        allowEsc
        notification
        notificationDelay={60}
        avatar={AvatarWhatsApp}
      />
      <Outlet />
    </>
  );
}

function PainelDeUsuarioRed() {
  return <Navigate to="/painelDeUsuario/pedidos" replace />;
}

export default function RouterComponent() {
  const { setConfigs, setRodape, carrinho, setCarrinho, dadosLogin, isLoading, setIsLoading, setError }: IContext = useContext(Context);
  const [numCel, setNumCel] = useState<string>('');
  const [logoURI, setLogoURI] = useState<string>('');

  async function getConfig() {
    try {
      const response = await api.get('/configs');

      if (response.status === 200) {
        const [{ val: uri }] = response.data.filter((config: any) => config.gru === 'logo');
        const [{ val: numWha }] = response.data.filter((config: any) => config.con === 'NumWha');

        setLogoURI('https://' + uri);
        setNumCel(numWha);
        setConfigs(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar configs: ' + error.message);
      setError(error.message);
    }
  }

  async function getCarrinho() {
    try {

      if (dadosLogin.id === 0) return;

      if (carrinho.length > 0) {
        carrinho.map((itemCarrinho: ICarrinho) => {
          const itemCarrinhoAtualizado = {
            cod: undefined, codmer: itemCarrinho.codmer,
            codapp_user: dadosLogin.id, qua: +itemCarrinho.quantidade
          };
          postItemCarrinho(itemCarrinhoAtualizado);
        });
      }

      const response = await api.get(`/itecar/listarPorUsuario?id=${dadosLogin.id}`);
      if (response.status === 200) {
        if (response.data === 'Produto não encontrado') {
          return;
        }

        const carrinhoNuvem: ICarrinho[] = response.data.content.map((itemCarrinho: any) => {
          return {
            cod: itemCarrinho.codIteCar,
            codmer: itemCarrinho.cod,
            codbar: itemCarrinho.codBar,
            mer: itemCarrinho.mer,
            codtam: itemCarrinho.tam,
            cor: {
              cod: itemCarrinho.codPad,
              padmer: itemCarrinho.padMer || 'Única',
              linkFot: itemCarrinho?.linkFot ? 'https://' + itemCarrinho.linkFot : 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg'
            },
            quantidade: itemCarrinho.quaPed,
            valor: itemCarrinho.valVenMin
          };
        });

        setCarrinho(carrinhoNuvem);
      }

    } catch (error: any) {
      console.log('Falha ao buscar carrinho ' + error.message);
    }
  }

  async function getRodape() {
    try {
      const response = await api.get('/rod');

      if (response.status === 200) {
        setRodape(response.data);
      }
    } catch (error: any) {
      toast.error('Falha ao buscar informações do rodapé: ' + error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    getConfig();
    getCarrinho();
    getRodape();
  }, []);

  useEffect(() => {
    getCarrinho();
  }, [dadosLogin]);

  return (
    <>
      {
        !isLoading ?
          <Router>
            < Routes >
              <Route element={<LayoutFixo cel={numCel} headerVisible />}>
                <Route path='/' element={<Home />} />
                <Route path='/produtoDetalhes/:codbar/:mer' element={<ProdutoDetalhes />} />
                <Route path='/produtoListagem/:pesquisa' element={<ProdutoListagem />} />
                <Route path='/rodape/:iterod' element={<Rodape />} />
                <Route path='/painelDeUsuario/:itemMenu' element={<PainelDeUsuario />} />
                <Route path='/painelDeUsuario/' element={<PainelDeUsuarioRed />} />
              </Route>
              <Route element={<LayoutFixo cel={numCel} />}>
                <Route path='/carrinho' element={<Carrinho />} />
                <Route path='/login' element={<Login />} />
                <Route path='/finalizarCarrinho' element={<FinalizarCarrinho />} />
                <Route path='/pedidoFinalizado' element={<PedidoFinalizado />} />
              </Route>
              <Route path='*' element={<ErrorPage />} />
            </Routes >
          </Router > :
          <Loader logoURI={logoURI} />
      }
    </>
  );
}
