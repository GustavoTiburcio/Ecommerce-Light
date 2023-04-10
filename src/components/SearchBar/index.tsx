import React from 'react';
import * as FiIcons from 'react-icons/fi';

import { Container, Input } from './styles';

export default function SearchBar({ placeholder }: any) {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        onChange={(e) => console.log(e)}
        autoFocus={true}
      />
      <FiIcons.FiSearch size={25} color='#000' style={{ cursor: 'pointer', width: '10%' }} />
    </Container>
  );
}

