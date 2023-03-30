import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  height: 20rem;
  margin: 2rem 0px;
  background-color: #f7f7f7;
`;

export const ImageDiv = styled.div`
  height: 100%;
  width: 35%;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 65%;

  b {
    font-size: 1.2rem;
    text-align: center;
    margin: 15px 0px;
  }

  span {
    text-align: justify;
    font-size: 0.9rem;
    font-weight: 450;
    width: 85%;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
`;
