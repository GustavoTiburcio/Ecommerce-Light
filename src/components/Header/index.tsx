import React, { useState, useEffect, useContext } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv, CartIconDiv, CartCountDiv } from './styles';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';
import useWindowDimensions from '../../utils/WindowDimensions';
import SideBar from '../SideBar';
import Context from '../../context/Context';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Header() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const location = useLocation();
  const { configs, carrinho }: any = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [headerFixoNoScroll, setHeaderFixoNoScroll] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [logoURI, setLogoURI] = useState<string>('');
  const [carrinhoCount, setCarrinhoCount] = useState<number>(0);
  const [itensMenu, setItensMenu] = useState([]);
  const [todosSecMerMenu, setTodosSecMerMenu] = useState([]);

  async function getItensMenu() {
    try {
      const response = await api.get('/secmer/listarParaMegaMenuPersonalizado');

      if (response.status === 200) {
        setItensMenu(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar itens do Menu. ' + error.message);
    }
  }

  async function getTodosSecMerMenu() {
    try {
      const response = await api.get('/secmer/listarParaMegaMenuSecoes');

      if (response.status === 200) {
        setTodosSecMerMenu(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar todos secmer menu. ' + error.message);
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
              opacity: 0.9
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
            <SearchBar placeholder='O que você procura?' setModalVisible={setModalVisible} />
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
    setCarrinhoCount(carrinho.length);
  }, [carrinho]);

  useEffect(() => {
    getItensMenu();
    getTodosSecMerMenu();
  }, []);

  return (
    <Container
      hoverHeaderActive={location.pathname === '/' && !headerFixoNoScroll && !isMobile}
    >
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <PesquisaModal />
      <Subcontainer>
        {isMobile &&
          <div>
            <Link to='#' className='menu-bars' onClick={() => setShowSideBar(true)}>
              <FaIcons.FaBars />
            </Link>
          </div>
        }
        <LogoDiv>
          <Link to={'/'}>
            <Logo src={logoURI} alt='Logo' />
          </Link>
        </LogoDiv>
        {!isMobile &&
          <Categorias hoverHeaderActive={location.pathname === '/'}>
            <div className='dropdown'>
              <button className='dropbtn'>
                <GiIcons.GiHamburgerMenu size={25} style={{ marginTop: 5 }} />
              </button>
              <div className='dropdown-content'>
                {todosSecMerMenu.map((item: any, index: number) => (
                  <a
                    key={index}
                    onClick={() => navigate(`/produtoListagem/secMer=${item?.secmer.replaceAll('/', '-')}`, { state: { caminho: 'Home > ' + item?.secmer.replaceAll('/', '-') } })}
                  >
                    {item?.secmer ?? ''}
                  </a>
                ))}
              </div>
            </div>
            {itensMenu.map((item: any, index: number) => (
              <div className='dropdown' key={index}>
                <button
                  className='dropbtn'
                  onClick={() => navigate(`/produtoListagem/itemMenu=${item?.secmer}`, { state: { caminho: 'Home > ' + item?.secmer } })}
                >
                  {item?.secmer ?? ''}
                </button>
                <div className='dropdown-content'>
                  {item.subsec.map((subItem: any, index: number) => (
                    <a
                      key={index}
                      onClick={() => navigate(`/produtoListagem/itemMenu=${subItem?.subsec}` , { state: { caminho: 'Home > ' + item?.secmer + ' > ' + subItem?.subsec } })}
                    >
                      {subItem?.subsec ?? ''}
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
          <Link to={'/'}>
            <AiIcons.AiOutlineHeart />
          </Link>
          <Link to={'/carrinho'}>
            <CartIcon count={carrinhoCount} />
          </Link>
          <Link to={'/login'}>
            <FiIcons.FiUser />
          </Link>
        </Buttons>
      </Subcontainer>
    </Container>
  );
}
