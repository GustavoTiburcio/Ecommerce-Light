import styled, { keyframes } from 'styled-components';
import { flash } from 'react-animations';

const flashAnimation = keyframes`${flash}`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
`;

export const Banner = styled.img`
  width: 100%;
`;

export const TitleDiv = styled.div`
  display:flex;
  width: 97%;
  align-items: center;
  justify-content: space-between;
  margin:2rem 0px;

  b{
    font-size: 1.4rem;
  }
  span{
   color: grey;
  }
`;

export const ProdutosDiv = styled.div`
  display:flex;
  width: 100%;
  margin: 2rem;
  `;

export const FiltrosDiv = styled.div`
  display:flex;
  /* align-items: center; */
  flex-direction: column;
  width: 16%;
  margin-left: 2%;
  text-align: center;

  span {
    font-size: 1.2rem;
    font-weight: 450;
  }
  p {
    font-size: 1.1rem;
  }
  `;

export const CardsDiv = styled.div`
  display:flex;
  width: 80%;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 4rem;
`;

export const InputSlider = styled.input`
  margin: 10px 0;
  width: 90%;
`;

export const ActivityIndicator = styled.img`
  margin: 2rem 0px;
  animation: 3s ${flashAnimation};
  animation-iteration-count: infinite;
`;
