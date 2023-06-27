import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  /* height: 10rem; */
  margin-top: 2rem;
  justify-content: space-evenly;

  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;

export const StarDiv = styled.div`
  display: flex;
`;

export const ProductScoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: grey;
  }
  span{
    color: #333;
    font-weight: 450;
    font-size: 1.2rem;
  }
  b{
    font-size: 1.8rem;
  }
`;

export const ReviewDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  span {
    color: grey;
    font-weight: 450;
    font-size: 1.2rem;
    max-width: 40ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ::first-letter{
      text-transform: capitalize;
    }

    @media screen and (max-width: 767px){
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 767px){
    margin-top: 10px;
  }
`;
