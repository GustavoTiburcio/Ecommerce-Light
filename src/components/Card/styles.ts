import styled from 'styled-components';


export const CardContainer = styled.div`
  display:  flex;
  flex-direction: column;
  height: 592px;
  width: 20%;
  /* width: 10vw; */
  background-color: transparent;
  text-align: start;
  cursor: pointer;
`;

export const CardImage = styled.img`
  object-fit: cover!important;
  max-width: 100%;
  height: 90%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  }
`;

export const TextDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-weight: 450;
  height: 10%;
`;
