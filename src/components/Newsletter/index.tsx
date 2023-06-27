import React from 'react';
import { Button, Container, Input, InputsDiv } from './styles';

export default function Newsletter() {
  return (
    <Container>
      <b>Stay on top of the news</b>
      <InputsDiv>
        <Input placeholder='Name'/>
        <Input placeholder='E-mail'/>
      </InputsDiv>
      <Button>
        Sign up
      </Button>
    </Container>
  );
}
