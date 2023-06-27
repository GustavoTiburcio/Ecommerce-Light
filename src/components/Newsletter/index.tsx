import React from 'react';
import { Button, Container, Input, InputsDiv } from './styles';

export default function Newsletter() {
  return (
    <Container>
      <b>Newsletter</b>
      <InputsDiv>
        <Input placeholder='Full Name'/>
        <Input placeholder='E-mail'/>
      </InputsDiv>
      <Button>
        Sign up
      </Button>
    </Container>
  );
}
