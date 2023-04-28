import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SubContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  background-color: #f7f7f7;


  @media screen and (max-width: 767px) {
    justify-content: center;
    padding-bottom: 15px;
  }
`;

export const WhatsappDiv = styled.a`
  display: flex;
  justify-content: center;
  width: 20%;
  img {
    width: 80%;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
      display: none;
  }
`;

export const ContatoDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  width: 20%;

  b {
    margin-top: 1rem;
  }

  span {
    font-size: 1rem;
    font-weight: 450;
    margin-top: 10px;
    width: 95%;
  }
  a {
    margin-right: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px){
    overflow: hidden;
    width: 32%;
    span  {
      font-size: 0.5rem;
    }
  }
`;

export const ContatoIconsDiv = styled.div`
  display: flex;
  font-size: 2rem;
  margin-top: 10px;

  @media screen and (max-width: 767px) {
      font-size: 1rem;
  }
`;

export const AjudaDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;

  b {
    margin-top: 1rem;
  }

  a {
    font-size: 1rem;
    font-weight: 450;
    margin-top: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
      font-size: 1rem;
      width: 32%;
      a {
        font-size: 0.5rem;
      }
  }
`;

export const InstitucionalDiv = styled.div`
display: flex;
  flex-direction: column;
  width: 20%;
  b {
    margin-top: 1rem;
  }

  a {
    font-size: 1rem;
    font-weight: 450;
    margin-top: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
      font-size: 1rem;
      width: 32%;
      a {
        font-size: 0.5rem;
      }
  }
`;

export const SegurancaDiv = styled.div`
  width: 20%;
  img {
    width: 60%;
  }

  @media screen and (max-width: 767px) {
      display: none;
  }
`;
