import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Header from '../Header';
import Context, { ICart, IConfigs, IContext } from '../../context/Context';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import AvatarWhatsApp from '../../assets/images/avatar_whatsapp.png';
import Loader from '../Loader';

//pages
import Home from '../../pages/Home';
import Footer from '../../pages/Footer';
import ProductDetails, { saveCartItem } from '../../pages/ProductDetails';
import ProductList from '../../pages/ProductList';
import Cart from '../../pages/Cart';
import Login from '../../pages/Login';
import ErrorPage from '../../pages/ErrorPage';
import UserPanel from '../../pages/UserPanel';
import Checkout from '../../pages/Checkout';
import FinishedOrder from '../../pages/FinishedOrder';
import { configsMock, footerMock } from '../../Mocks/apiMocks';

function FixedLayout({ cel, headerVisible }: { cel: string, headerVisible?: boolean }) {
  return (
    <>
      {headerVisible && <Header />}
      <FloatingWhatsApp
        phoneNumber={cel.replace(/\D/g, '')}
        accountName={'Ecommerce-Light'}
        chatMessage={'Hello there! 🤝 \nCan i help you?'}
        defaultMessage={''}
        placeholder={'Type a message..'}
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

function UserPanelRed() {
  return <Navigate to="/userPanel/pedidos" replace />;
}

export default function RouterComponent() {
  const {
    setConfigs, setFooter, cart, setCart,
    loginData, isLoading, setIsLoading, setError
  }: IContext = useContext(Context);
  const [celNumber, setCelNumber] = useState<string>('');
  const [logoURI, setLogoURI] = useState<string>('');

  async function getConfigs() {
    try {

      const [{ value: uri }] = configsMock.filter((config: IConfigs) => config.config === 'logo');
      const [{ value: numWha }] = configsMock.filter((config: IConfigs) => config.config === 'whatsapp');

      setLogoURI(uri);
      setCelNumber(numWha);
      setConfigs(configsMock);

    } catch (error: any) {
      toast.error('Failed to fetch configs. ' + error.message);
      setError(error.message);
    }
  }

  async function getCart() {
    try {

      if (loginData.id === 0) return;

      if (cart.length > 0) {
        cart.map((itemCarrinho: ICart) => {
          const itemCarrinhoAtualizado = {
            cod: undefined, codmer: itemCarrinho.codmer,
            codapp_user: loginData.id, qua: +itemCarrinho.quantidade
          };
          saveCartItem(itemCarrinhoAtualizado);
        });
      }

      const response = await api.get(`/itecar/listarPorUsuario?id=${loginData.id}`);
      if (response.status === 200) {
        if (response.data === 'Product not found') {
          return;
        }

        const userCart: ICart[] = response.data.content.map((itemCarrinho: any) => {
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

        setCart(userCart);
      }

    } catch (error: any) {
      console.log('Failed to fetch user cart. ' + error.message);
    }
  }

  async function getFooterItens() {
    try {
      setFooter(footerMock);
    } catch (error: any) {
      toast.error('Failed to fetch footer itens. ' + error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    getConfigs();
    getCart();
    getFooterItens();
  }, []);

  useEffect(() => {
    getCart();
  }, [loginData]);

  return (
    <>
      {
        !isLoading ?
          <Router>
            <Routes>
              <Route element={<FixedLayout cel={celNumber} headerVisible />}>
                <Route path='/' element={<Home />} />
                <Route path='/productDetails/:sku/:product' element={<ProductDetails />} />
                <Route path='/productList/:search' element={<ProductList />} />
                <Route path='/footer/:footerItem' element={<Footer />} />
                <Route path='/userPanel/:menuItem' element={<UserPanel />} />
                <Route path='/userPanel/' element={<UserPanelRed />} />
              </Route>
              <Route element={<FixedLayout cel={celNumber} />}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/finishedOrder' element={<FinishedOrder />} />
              </Route>
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </Router> :
          <Loader logoURI={logoURI} />
      }
    </>
  );
}
