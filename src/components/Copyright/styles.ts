import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background-color: #1D1D1D;

  img {
    height: 32px;
    width: 32px;
  }

  a {
    color: #fff;
    cursor: pointer;
    text-decoration: none;
  }

  @media screen and (max-width: 767px){
    font-size: 0.7rem;

    img {
      height: 20px;
      width: 20px;
    }
  }
`;
