import styled from 'styled-components';

interface MenuButtonsProps {
  active?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 767px){
    text-align: center;
  }
`;

export const MenuContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  width: 95%;

  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;

export const MenuButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  overflow: hidden;

  @media screen and (max-width: 767px){
    width: 100%;
    margin-bottom: 2rem;
  }
`;

export const MenuButtons = styled.span<MenuButtonsProps>`
    display: flex;
    width: 100%;
    font-weight: 450;
    cursor: pointer;
    padding: 0.5rem 0px;
    border-left: 2px solid #E5E5E5;
    border-right: 2px solid #E5E5E5;

    :first-child {
      border-top: 2px solid #E5E5E5;
    }
    :last-child {
      border-bottom: 2px solid #E5E5E5;
    }

    ${({ active }) => active && 'background-color: #F2F2F2;'}

    :hover {
      background-color: #F2F2F2;
    }

    @media screen and (max-width: 767px){
      padding: 0.7rem 0px;
    }
`;

export const MenuInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  @media screen and (max-width: 767px){
    width: 100%;
  }
`;

export const FiltrosDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  input{
    padding: 0px 5px;
  }
`;

export const PedidosDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TablePedidoTitleDiv = styled.div`
  display: flex;
  width: 100%;
  background-color: #F2F2F2;
  margin-top: 1rem;
  border: 2px solid #E5E5E5;
  font-weight: 450;

  span {
    display: flex;
    justify-content: center;
  }

  .pedido {
    width: 15%;
  }
  .valor {
    width: 10%;
  }
  .status {
    width: 15%;
  }
  .observação {
    width: 50%;
  }
  .detalhes {
    width: 10%;
  }

  @media screen and (max-width: 767px){
    .observação {
      width: 35%;
    }
    .detalhes {
      width: 25%;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;

export const TablePedidoLinhaDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border: 2px solid #E5E5E5;
  border-top: 0;
  padding: 10px 0px;

  :last-child{
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1024px){
    font-size: 0.8rem;
  }
  @media screen and (max-width: 767px){
      font-size: 0.6rem;
  }
`;

export const PedidoInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
`;

export const PedidoValorDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
  `;

export const PedidoStatusDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 15%;
`;

export const PedidoObsDiv = styled.div`
  width: 50%;
  word-wrap: break-word;

  @media screen and (max-width: 767px){
    width: 35%;
  }
 `;

export const PedidoButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;

  @media screen and (max-width: 767px){
    width: 25%;
  }
`;

export const DetalhesPedidoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DadosDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 1rem;

  span {
    margin-left: 10px;
  }

  p {
    margin-left: 10px;
  }

  @media screen and (max-width: 767px){
    text-align: left;
    span {
      margin-left: 0px;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
  }
`;

export const ProdutosDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

export const ProdutosInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    margin-left: 10px;
    font-weight: 450;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }

  p {
    font-weight: 450;
    color: blue;
    cursor: pointer;

    :hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 767px){
    flex-direction: column;
  }
`;

export const DetalhesPedidoButtonsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  span:hover {
    color:red;
    cursor: pointer;
    text-decoration: underline;
  }

  button:nth-child(2) {
    margin-top: 0px;
  }

  @media screen and (max-width: 767px){
    margin: 1.5rem 0rem;
  }
`;

export const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;

  div {
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 450;
    margin-right: 5px;
  }
  input {
    width: 40%;
    height: 20%;
    word-break: break-word;
  }
  textarea {
    padding: 5px;
  }
`;

export const AlterarSenhaForm = styled.form`
  display: flex;

  input {
    padding: 10px;
    :nth-child(1){
      margin: 0px 10px;
    }
  }

  @media screen and (max-width: 767px){
    flex-direction: column;

    input {
      padding: 10px;
      :nth-child(n){
        margin: 10px 0px;
      }
    }
  }
`;

export const DadosPessoaisForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  input {
    padding: 10px;
    margin-bottom: 0.5rem;
  }
  button {
    align-self: center;
    margin: 0px 0px;
  }

  @media screen and (max-width: 767px){
    width: 100%;
    input {
    }
  }
`;

export const Button = styled.button`
  color: #fff;
  padding: 8px 10px;
  margin: 0px 10px;
  background-color:#000;
  border-style: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 450;
  font-size: 0.8rem;

  :nth-child(2) {
    margin-top: 5px;
    background-color: #545454;
  }

  :active {
    opacity: 0.6;
  }

  @media screen and (max-width: 1024px){
    font-size: 0.6rem;
  }
`;

export const EnderecoDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  padding: 1rem;
  border-radius: 15px;

  :nth-child(n + 2) {
    margin-top: 10px;
  }

  @media screen and (max-width: 767px){
    width: 100%;
  }
`;
