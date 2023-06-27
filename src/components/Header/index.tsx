import React, { useState, useEffect, useContext } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv, CartIconDiv, CartCountDiv } from './styles';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';
import useWindowDimensions from '../../utils/WindowDimensions';
import Context, { IContext } from '../../context/Context';
import CountUp from 'react-countup';
import api from '../../services/api';
import SideBarMobile from '../SideBarMobile';
import AllCategoriesMenu from '../AllCategoriesMenu';

export default function Header() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const location = useLocation();
  const { configs, cart, loginData }: IContext = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [headerFixoNoScroll, setHeaderFixoNoScroll] = useState(false);
  const [logoURI, setLogoURI] = useState<string>('');
  const [carrinhoCount, setCarrinhoCount] = useState<number>(0);
  const [menuItems, setMenuItems] = useState([]);
  const [allCategoriesMenu, setAllCategoriesMenu] = useState([]);

  async function getItensMenu() {
    try {
      const response = await api.get('/itemen/listarParaMegaMenuPersonalizado');

      if (response.status === 200) {
        setMenuItems(response.data);
      }

    } catch (error: any) {
      console.log('Falha ao buscar itens do Menu. ' + error.message);
    }
  }

  async function getTodosSecMerMenu() {
    try {
      const response = await api.get('/secmer/listarParaMegaMenuSecoes');

      if (response.status === 200) {
        setAllCategoriesMenu(response.data);
      }

    } catch (error: any) {
      console.log('Falha ao buscar todos secmer menu. ' + error.message);
    }
  }

  function PesquisaModal() {
    return (
      <>
        <ReactModal
          isOpen={modalVisible}
          appElement={document.getElementById('root') as HTMLElement}
          contentLabel='Minimal Modal Example'
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => setModalVisible(false)}
          style={{
            overlay: {
              backgroundColor: '#1D1D1D',
              opacity: 0.9,
              zIndex: 99
            },
            content: {
              display: 'flex',
              height: 150,
              width: isMobile ? '80%' : '50%',
              margin: 'auto',
            },
          }}
        >
          <ModalDiv>
            <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
              <AiIcons.AiOutlineClose onClick={() => setModalVisible(false)} size={25} />
            </div>
            <SearchBar placeholder='What are you looking for?' setModalVisible={setModalVisible} />
          </ModalDiv>
        </ReactModal>
      </>
    );
  }

  function CartIcon({ count }: any) {
    return (
      <CartIconDiv>
        <FiIcons.FiShoppingCart />
        {count > 0 && <CartCountDiv style={{ backgroundColor: 'red' }}><CountUp end={count} duration={0} /></CartCountDiv>}
      </CartIconDiv>
    );
  }

  useEffect(() => {
    //Função chamada quando scrolla a página
    const handleScroll = (e: any) => {
      const scrollTop = e.target.documentElement.scrollTop;
      if (scrollTop > 200) {
        setHeaderFixoNoScroll(true);
      } else {
        setHeaderFixoNoScroll(false);
      }
    };

    if (document) {
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (document) {
        document.removeEventListener('scroll', handleScroll);
      }
    };
  }, [setHeaderFixoNoScroll]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  useEffect(() => {
    setCarrinhoCount(cart.length);
  }, [cart]);

  useEffect(() => {
    getItensMenu();
    getTodosSecMerMenu();
  }, []);

  return (
    <Container
      hoverHeaderActive={location.pathname === '/' && !headerFixoNoScroll && !isMobile}
    >
      <PesquisaModal />
      <Subcontainer>
        {isMobile &&
          <SideBarMobile
            todasCategorias={allCategoriesMenu}
            itensMenu={menuItems}
          />
        }
        <LogoDiv>
          <Link to={'/'}>
            <Logo src={logoURI} alt='Logo' />
          </Link>
        </LogoDiv>
        {!isMobile &&
          <Categorias hoverHeaderActive={location.pathname === '/'}>
            <AllCategoriesMenu AllCategoriesMenu={allCategoriesMenu} />
            {menuItems.map((itemMenu: any, index: number) => (
              <div className='dropdown' key={index}>
                <button
                  className='dropbtn'
                  onClick={() => navigate(`/productList/itemMenu=${itemMenu?.parametros.replaceAll('=', ':')}`, { state: { caminho: 'Home > ' + itemMenu?.secmer.replaceAll('/', ' - '), linimaban: itemMenu?.linimaban } })}
                >
                  {itemMenu?.secmer ?? ''}
                </button>
                <div className='dropdown-content'>
                  {itemMenu.subsec.map((subSec: any, index: number) => (
                    <a
                      key={index}
                      onClick={() => navigate(`/productList/itemMenu=${subSec?.parametros.replaceAll('=', ':')}`, { state: { caminho: 'Home > ' + itemMenu?.secmer.replaceAll('/', ' - ') + ' > ' + subSec?.subsec, linimaban: itemMenu?.linimaban } })}
                    >
                      {subSec?.subsec ?? ''}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </Categorias>
        }
        <Buttons>
          <a onClick={() => setModalVisible(true)}>
            <FiIcons.FiSearch />
          </a>
          <Link to={'/productList/listaDesejos='}>
            <AiIcons.AiOutlineHeart />
          </Link>
          <Link to={'/cart'}>
            <CartIcon count={carrinhoCount} />
          </Link>
          <Link to={loginData.id === 0 ? '/login' : '/userPanel'}>
            <FiIcons.FiUser />
          </Link>
        </Buttons>
      </Subcontainer>
    </Container>
  );
}
