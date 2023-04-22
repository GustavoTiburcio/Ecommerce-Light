import styled from 'styled-components';

interface tamanhoProps {
  selecionado: boolean;
}

export const Tamanho = styled.div<tamanhoProps>`
  display: flex;
  height: 36px;
  width: 36px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid white;
  ${({selecionado}) => selecionado ? 'outline: 2px solid red; color: red;' : ''}
`;
