import styled from 'styled-components';

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
  flex-direction: column;
  width: 20%;
  `;

export const CardsDiv = styled.div`
  display:flex;
  width: 80%;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 4rem;
`;
