import styled, { keyframes } from 'styled-components';
import { flash } from 'react-animations';

const flashAnimation = keyframes`${flash}`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color: #FFF;
  margin-top: -6rem;
  position: relative;
  z-index: 999;
`;

export const Image = styled.img`
  animation: 3s ${flashAnimation};
  animation-iteration-count: infinite;

`;

