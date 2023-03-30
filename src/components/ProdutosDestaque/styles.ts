import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80vh;
  margin: 2rem 0px;
  background-color: #eee;

  p {
    font-size: 2.5rem;
    font-weight: bold;
    font-style: italic;
    margin: 2% 0px;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 65vh;
  width: 99vw;
  background-color: #fff;
`;

export const Card = styled.div`
  height: 90%;
  width: 24%;
  background-color: #eee;
`;

export const Card2 = styled.div`
  height: 90%;
  width: 24%;
  background-color: #fff;
`;
