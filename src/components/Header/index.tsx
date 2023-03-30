import React from 'react';
import { Buttons, Categorias, Container, LogoDiv, Logo, Subcontainer } from './styles';
import LogoSVG from '../../assets/images/header_logo.svg';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { categorias } from './CategoriasMock';

export default function Header() {
  return (
    <Container>
      <Subcontainer>
        <LogoDiv>
          <Logo src={LogoSVG} alt='Logo' />
        </LogoDiv>
        <Categorias>
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
          <Link to={'/'}>
            <FiIcons.FiSearch />
          </Link>
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
