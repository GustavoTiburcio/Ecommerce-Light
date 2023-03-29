import React from 'react';
import Logo from '../../assets/images/header_logo.svg';
import { Container, Image } from './styles';

export default function Loader() {
  return (
    <>
      <Container>
        <Image src={Logo} alt='Logo' />
      </Container>
    </>
  );
}
