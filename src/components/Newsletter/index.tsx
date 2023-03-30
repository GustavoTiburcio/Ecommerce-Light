import React from 'react';
import { Button, Container, Input, InputsDiv } from './styles';

export default function Newsletter() {
  return (
    <Container>
      <b>Receba nossas novidades</b>
      <InputsDiv>
        <Input placeholder='Nome'/>
        <Input placeholder='E-mail'/>
      </InputsDiv>
      <Button>
        Cadastrar
      </Button>
    </Container>
  );
}
