import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  margin-top: -6rem;
  animation: 1s ${fadeInAnimation};

  @media screen and (max-width: 767px) {
    margin-top: 0rem;
  }
`;

export const LogoRodape = styled.img`
  cursor: pointer;
  margin: 2rem 0px;
`;
