import styled from 'styled-components';

interface IRodape {
  width?: number;
  cursor?: 'pointer' | 'default';
}

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

export const WhatsappDiv = styled.a<IRodape>`
  display: flex;
  justify-content: center;
  width: ${({ width }) => width + '%'};

  img {
    width: 80%;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
      display: none;
  }
`;

export const ContatoIconsDiv = styled.div`
  margin-top: 10px;
  a {
    * {
      font-size: 2rem;
    }
    @media screen and (max-width: 767px) {
      * {
        font-size: 1rem;
      }
    }
  }

  a:nth-child(n+2){
    margin-left: 15px;
  }
`;

export const RodapeDiv = styled.div<IRodape>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width + '%'};
  b {
    margin-top: 1rem;
  }

  @media screen and (max-width: 767px) {
      font-size: 1rem;
      width: 32%;
      a {
        font-size: 0.5rem;
      }
  }
`;

export const ItemRodape = styled.a<IRodape>`
  font-size: 1rem;
  font-weight: 450;
  margin-top: 10px;
  cursor: ${({ cursor }) => cursor ? cursor : 'default'};
  width: 90%;

  @media screen and (max-width: 767px) {
      font-size: 0.5rem;
  }
`;

export const SegurancaDiv = styled.div<IRodape>`
  width: ${({ width }) => width + '%'};
  img {
    width: 60%;
  }

  @media screen and (max-width: 767px) {
      display: none;
  }
`;
