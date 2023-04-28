import React from 'react';
import { Container } from './styles';
import tifirelogo from '../../assets/images/tifire.ico';

export default function Copyright() {
  return (
    <Container>
      <img src={tifirelogo} />
      <a href='http://tifire.com/'>TI.Fire Sistemas e Consultoria</a>
    </Container>
  );
}
