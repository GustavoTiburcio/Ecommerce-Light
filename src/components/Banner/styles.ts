import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  height: 13rem;
  margin: 2rem 0px;

  @media screen and (max-width: 767px){
    height: 5rem;
    width: 95%;
    margin: 1rem 0px;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  @media screen and (max-width: 767px){

  }
`;
