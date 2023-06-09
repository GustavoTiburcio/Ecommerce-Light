import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

const fadeInUpAnimation = keyframes`${fadeInUp}`;

interface CardProps {
  imageOrientation?: string;
}

export const CardContainer = styled.div<CardProps>`
  display:  flex;
  flex-direction: column;
  height: ${({ imageOrientation }) => imageOrientation === 'paisagem' ? '356px' : '592px'};
  ${({ imageOrientation }) => imageOrientation !== 'paisagem' ? 'width: 20%;' : ''}
  background-color: transparent;
  text-align: start;
  cursor: pointer;
  animation: 0.5s ${fadeInUpAnimation};

  @media screen and (max-width: 767px){
    align-items: ${({ imageOrientation }) => imageOrientation === 'paisagem' ? 'center' : 'start'};
    height: ${({ imageOrientation }) => imageOrientation === 'paisagem' ? '180px' : '356px'};
    width: ${({ imageOrientation }) => imageOrientation === 'paisagem' ? '180px' : '180px'};
  }
`;

export const CardImage = styled.img`
  object-fit: cover!important;
  max-width: 100%;
  height: 80%;
  box-shadow: 0 4px 8px 0 rgba(171, 183, 183,0.2), 0 3px 10px 0 rgba(171, 183, 183,0.5);

  :hover {
    box-shadow: 0 8px 16px 0 rgba(171, 183, 183,0.2), 0 6px 20px 0 rgba(171, 183, 183,0.5);
  }
`;

export const TextDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 450;
  height: 10%;
  @media screen and (max-width: 767px){
    font-size: 0.8rem;
    height: 20%;
  }

  .productName {
    text-transform: capitalize;
  }
`;

export const SoldOutText = styled.b`
  color: red;
`;
