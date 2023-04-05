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
`;

export const QuantidadeInput = styled.input`
  width: 36px;
  height: 36px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 450;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type=number] {
    -moz-appearance: textfield;
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
`;

export const FreteDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const FinalizarCarrinhoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  span {
    font-weight: 450;
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
  color: #fff;
  padding: 0px 20px;
  height: 2.5rem;
  background-color: #000;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  font-weight: 450;
  transition: all ease-in-out 200ms;
  margin-top: 1rem;

  :hover {
    background-color: #fff;
    color: #000;
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
