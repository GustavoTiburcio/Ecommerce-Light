import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  background-color: #fff;

  hr {
    border-width: 1px;
    color: #eee;
    margin: 0px 1rem;
    opacity: 0.3;
    width: 70%;
  }

  b {
    margin-top: 2rem;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 767px){
    hr {
      width: 100%;
    }
  }
`;

export const LogoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 2rem 0rem;

  span {
    font-weight: 450;
  }

  @media screen and (max-width: 767px){
      flex-direction: column;
  }
`;

export const HiddenDiv = styled.div`
  width: 9rem;
  visibility: hidden;
`;

export const Logo = styled.img`
  cursor: pointer;
`;

export const ListaCarrinhoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TituloColunasDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 70%;
  background-color: #F5F5F5;
  height: 4rem;
  margin-top: 2rem;

  span{
    font-weight: 450;
    text-align: center;
  }
  .produto {
    width: 50%;
    text-align: center;
  }
  .preco {
    width: 20%;
  }
  .quantidade {
    width: 20%;
  }
  .total {
    width: 10%;
  }

  @media screen and (max-width: 767px){
    display: none;
  }
`;

export const ProdutoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 7rem;
  border-bottom: 1px solid #eee;
`;

export const ProdutoNomeDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 50%;
  height: 100%;

  img {
    width: 20%;
    height: 80%;
    object-fit: contain;
  }
  span {
    overflow: hidden;
    text-overflow:ellipsis;
    width: 80%;
    font-weight: 450;
    text-transform: capitalize;
  }
`;

export const PrecoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;

  span {
    font-weight: 600;
  }
`;

export const QuantidadeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;

  span{
    font-weight: 450;
  }
`;

export const QuantidadeInputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const QuantidadeButton = styled.button`
  width: 36px;
  height: 36px;
  margin: 0px 10px;
  font-size: 1.1rem;
  font-weight: 450;


  @media screen and (max-width: 767px){
    width: 24px;
    height: 24px;
    font-size: 0.9rem;
    margin: 0px 10px;
  }

`;

export const QuantidadeInput = styled.input`
  width: 36px;
  height: 36px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 450;
  appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (max-width: 767px){
    width: 24px;
    height: 24px;
  }
`;

export const TotalDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;

  span {
    font-weight: 600;
  }
`;

export const FinalizarDiv = styled.div`
  display: flex;
  margin: 2rem 0rem;
  width: 70%;

  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;

export const FreteDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media screen and (max-width: 767px){
    width: 100%;
  }
`;

export const FinalizarCarrinhoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  span {
    font-weight: 450;
  }

  @media screen and (max-width: 767px){
    width: 100%;
  }
`;

export const CupomInput = styled.input`
  border-style: none;
  border-bottom: 1px solid rgba(0,0,0, 0.2);
  height: 2rem;
  font-weight: 450;

  :focus {
    outline: none;
  }
`;

export const FinalizarButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  /* height: 2.5rem; */
  padding: 10px 0px;
  background-color: #000;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  font-weight: 450;
  margin-top: 1rem;

  span {
    margin-left: 10px;
  }

  :active {
    opacity: 0.6;
  }

  :disabled {
    opacity: 0.6;
    cursor: default;
  }

`;

export const TotaisDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TotaisFinalizarDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProdutoMobileDiv = styled.div`
  display: flex;
  margin: 1rem 0px;
  width: 90%;
`;
export const ProdutoMobileImageDiv = styled.div`
  width: 20%;
  background-color: grey;
`;
export const ProdutoMobileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  margin-left: 5px;

  span {
    font-size: 0.9rem;
  }
`;

export const ProdutoMobileImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const MobilePrecoDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;

  b {
    font-size: 1rem;
    margin-top: 0px;
  }
`;
