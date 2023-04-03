import styled from 'styled-components';

interface tamanhoProps {
  selecionado: boolean;
}

export const Tamanho = styled.div<tamanhoProps>`
  display: flex;
  height: 36px;
  width: 36px;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  font-weight: bold;
  cursor: pointer;
  border-color: ${({selecionado}) => selecionado ? 'red' : ''};

  :nth-child(n+2) {
    margin-left: 10px;
  }
`;
