import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 8rem;
  margin: 2rem 0px;

  div:last-child {
    border: none;
  }

  @media screen and (max-width: 767px) {
    align-items: center;
    width: 100%;
    height: 4rem;
    margin: 0rem 0px;
    margin-top: 1rem;
  }
`;

export const InfoCard = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  border-right: 2px solid #C6C5C8;
  font-size: 1rem;
  font-weight: 450;

  span {
    width: 80%;
  }

`;

export const IconDiv = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;

export const MobileDiv = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;

  span {
    width: 80%;
  }
`;
