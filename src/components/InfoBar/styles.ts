import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 80%;
  height: 8rem;
  margin: 2rem 0px;

  div:last-child {
    border: none;
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
