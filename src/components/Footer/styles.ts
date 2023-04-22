import styled from 'styled-components';

export const Container = styled.div`

`;

export const SubContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15rem;
  margin-top: 2rem;
  background-color: #f7f7f7;
`;

export const WhatsappDiv = styled.a`
  display: flex;
  justify-content: center;
  width: 20%;
  img {
    width: 80%;
    cursor: pointer;
  }
`;

export const ContatoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;

  span{
    font-size: 1rem;
    font-weight: 450;
    width: 95%;
  }
  a{
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const ContatoIconsDiv = styled.div`
  display: flex;
  font-size: 2rem;
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
`;

export const SegurancaDiv = styled.div`
  width: 20%;
  img {
    width: 60%;
  }
`;
