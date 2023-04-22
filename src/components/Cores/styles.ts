import styled from 'styled-components';

interface CorProps {
  backgroundImage?: string;
  selecionado: boolean;
}

export const CorDiv = styled.div<CorProps>`
  display: flex;

  height: 48px;
  width: 48px;
  background-image: ${({ backgroundImage }) => backgroundImage ? `URL(${backgroundImage})` : ''};
  background-size: cover;
  cursor: pointer;
  border: ${({ backgroundImage }) => backgroundImage ? '2px solid white;' : ''};
  opacity: ${({ selecionado }) => selecionado ? 1 : 0.7};
  ${({ selecionado }) => selecionado ? 'outline: 2px solid red;' : ''}

  span {
    width: 100%;
    height: 100%;
    font-size: 0.6rem;
    font-weight: bold;
    text-align:center;
    text-transform: uppercase;
    word-wrap: break-word;
    overflow: hidden;
  }
`;

export const SelectPersonalizadoContainerDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 36;

  span {
    margin-left: 10px;
  }
  p{
    color: grey;
  }
`;
