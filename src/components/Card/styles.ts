import styled from 'styled-components';


export const CardContainer = styled.div`
  display:  flex;
  flex-direction: column;
  height: 90%;
  width: 20%;
  /* width: 10vw; */
  background-color: #F7F7F7;
  text-align: start;
  cursor: pointer;
`;

export const CardImage = styled.img`
  object-fit: cover!important;
  max-width: 100%;
  height: 90%;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 450;
  height: 10%;
`;
