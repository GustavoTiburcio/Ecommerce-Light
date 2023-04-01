import React, { useState } from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer, ModalDiv } from './styles';
import LogoSVG from '../../assets/images/header_logo.svg';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { categorias } from './CategoriasMock';
import ReactModal from 'react-modal';
import SearchBar from '../SearchBar';


export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const paginaAtual = useLocation();

  return (
    <Container hoverHeaderActive={paginaAtual.pathname === '/' ? true : false}>
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
            width: '50%',
            margin: 'auto',
          },
        }}
      >
        <ModalDiv>
          <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }}>
            <AiIcons.AiOutlineClose onClick={() => setModalVisible(false)} size={25} />
          </div>
          <SearchBar placeholder='O que você procura?' />
        </ModalDiv>
      </ReactModal>
      <Subcontainer>
        <LogoDiv>
          <Link to={'/'}>
            <Logo src={LogoSVG} alt='Logo' />
          </Link>
        </LogoDiv>
        <Categorias hoverHeaderActive={paginaAtual.pathname === '/' ? true : false}>
          <div className='dropdown'>
            <button className='dropbtn'>
              <GiIcons.GiHamburgerMenu size={25} style={{ marginTop: 5 }} />
            </button>
            <div className='dropdown-content'>
              <a href='#'>Novidades</a>
              <a href='#'>Promoções</a>
              <a href='#'>Fitness</a>
            </div>
          </div>
          {categorias.map((categoria, index) => (
            <div className='dropdown' key={index}>
              <button className='dropbtn'>
                {categoria.categoria}
              </button>
              <div className='dropdown-content'>
                {categoria.filhos.map((filho, index) => (
                  <a href='#' key={index}>{filho}</a>
                ))}
              </div>
            </div>
          ))}
        </Categorias>
        <Buttons>
          <a onClick={() => setModalVisible(true)}>
            <FiIcons.FiSearch />
          </a>
          <Link to={'/'}>
            <AiIcons.AiOutlineHeart />
          </Link>
          <Link to={'/'}>
            <FiIcons.FiShoppingCart />
          </Link>
          <Link to={'/'}>
            <FiIcons.FiUser />
          </Link>
        </Buttons>
      </Subcontainer>
    </Container>
  );
}
