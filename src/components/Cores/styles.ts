import styled from 'styled-components';

interface CorProps {
  backgroundColor?: string;
  selecionado: boolean;
}

export const CorDiv = styled.div<CorProps>`
  height: 36px;
  width: 36px;
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#fff'};
  cursor: pointer;
  border: ${({selecionado}) => selecionado ? '3px solid #000' : ''};
  opacity: ${({selecionado}) => selecionado ? 1 : 0.7};;

`;
