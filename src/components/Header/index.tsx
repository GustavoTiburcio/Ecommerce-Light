import React from 'react';
import { Buttons, Categoria, Categorias, Container, LogoDiv, Subcontainer } from './styles';
import Logo from '../../assets/images/header_logo.svg';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Header() {
  const categorias =
    ['novidades', 'feminino', 'masculino',
      'praia', 'kids', 'acessórios', 'outlet', 'acessórios', 'outlet', 'acessórios', 'outlet'];

  return (
    <Container>
      <Subcontainer>
        <LogoDiv>
          <img src={Logo} alt="Logo" />
        </LogoDiv>
        <Categorias>
          {categorias.map((categoria, index) => (
            <Categoria key={index}>
              {categoria}
            </Categoria>
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
