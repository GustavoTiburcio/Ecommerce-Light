import React from 'react';
import { Container } from './styles';
import tifirelogo from '../../assets/images/tifire.ico';

export default function Copyright() {
  return (
    <Container>
      <img src={tifirelogo} />
      <p>TI.Fire Sistemas e Consultoria 2023. Todos os direitos reservados</p>
    </Container>
  );
}
