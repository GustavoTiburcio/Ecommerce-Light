import React, { useState, useEffect, useContext } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv, CartIconDiv, CartCountDiv } from './styles';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { categorias } from './CategoriasMock';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';
import useWindowDimensions from '../../utils/WindowDimensions';
import SideBar from '../SideBar';
import Context from '../../context/Context';
import CountUp from 'react-countup';

export default function Header() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const paginaAtual = useLocation();
  const { configs, carrinho }: any = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [headerFixoNoScroll, setHeaderFixoNoScroll] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [logoURI, setLogoURI] = useState<string>('');
  const [carrinhoCount, setCarrinhoCount] = useState<number>(0);

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

  return (
    <Container
      hoverHeaderActive={paginaAtual.pathname === '/' && !headerFixoNoScroll && !isMobile}
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
          <Categorias hoverHeaderActive={paginaAtual.pathname === '/'}>
            <div className='dropdown'>
              <button className='dropbtn'>
                <GiIcons.GiHamburgerMenu size={25} style={{ marginTop: 5 }} />
              </button>
              <div className='dropdown-content'>
                <a href='/produtoListagem'>Novidades</a>
                <a href='/produtoListagem'>Promoções</a>
                <a href='/produtoListagem'>Fitness</a>
              </div>
            </div>
            {categorias.map((categoria, index) => (
              <div className='dropdown' key={index}>
                <button className='dropbtn' onClick={() => navigate('/produtoListagem')}>
                  {categoria.categoria}
                </button>
                <div className='dropdown-content'>
                  {categoria.filhos.map((filho, index) => (
                    <a href='/produtoListagem' key={index}>{filho}</a>
                  ))}
                </div>
              </div>
            ))}
          </Categorias>}
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
