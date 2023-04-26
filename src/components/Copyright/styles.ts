import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  background-color: #1D1D1D;

  img {
    height: 32px;
    width: 32px;
  }
  p {
    margin-left: 5px;
    margin-top: 10px;
    color: #fff;
  }

  @media screen and (max-width: 767px){
    height: 4rem;
    text-align: center;

    img {
      visibility: hidden;
    }
  }
`;
