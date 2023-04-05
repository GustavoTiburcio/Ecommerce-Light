import React, { useState } from 'react';
import {
  Container, CupomInput, FinalizarButton, FinalizarCarrinhoDiv, FinalizarDiv,
  FreteDiv, HiddenDiv, ListaCarrinhoDiv, Logo, LogoDiv, PrecoDiv, ProdutoDiv,
  ProdutoNomeDiv, QuantidadeButton, QuantidadeDiv, QuantidadeInput, QuantidadeInputDiv, TituloColunasDiv, TotaisDiv, TotaisFinalizarDiv, TotalDiv
} from './styles';
import LogoSVG from '../../assets/images/header_logo.svg';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Copyright from '../../components/Copyright';

export default function Carrinho() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const [quantidade, setQuantidade] = useState('1');

  function incrementarQuantidade() {
    if (quantidade === '1') {
      return;
    }
    setQuantidade(prev => {
      return String(+prev - 1);
    });
  }

  function decrementarQuantidade() {
    setQuantidade(prev => {
      return String(+prev + 1);
    });
  }

  function alterarQuantidade(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value >= 0) {
      setQuantidade(e.target.value!);
    }
  }


  return (
    <Container>
      <LogoDiv>
        <HiddenDiv />
        <Link to={'/'}>
          <Logo src={LogoSVG} alt='Logo' />
        </Link>
        <span>Compra 100% Segura</span>
      </LogoDiv>
      <hr />
      <b>Meu carrinho de compras</b>
      <ListaCarrinhoDiv>
        <TituloColunasDiv>
          <span className='produto'>Lista de Produtos</span>
          <span className='preco'>Preço Unitário</span>
          <span className='quantidade'>Quantidade</span>
          <span className='total'>Total</span>
        </TituloColunasDiv>
        <ProdutoDiv>
          <ProdutoNomeDiv>
            <img src='https://td0295.vtexassets.com/arquivos/ids/1760416-1200-auto?v=638159783664100000&width=1200&height=auto&aspect=true' />
            <span>Bermuda Versatily Bolsos Azul Swedish P</span>
          </ProdutoNomeDiv>
          <PrecoDiv>
            <span>R$ 228,90</span>
          </PrecoDiv>
          <QuantidadeDiv>
            <QuantidadeInputDiv>
              <QuantidadeButton
                onClick={incrementarQuantidade}
              >
                -
              </QuantidadeButton>
              <QuantidadeInput
                type={'number'}
                value={quantidade}
                onChange={alterarQuantidade}
              />
              <QuantidadeButton
                onClick={decrementarQuantidade}>
                +
              </QuantidadeButton>
            </QuantidadeInputDiv>
          </QuantidadeDiv>
          <TotalDiv>
            <span>R$ 228,90</span>
          </TotalDiv>
        </ProdutoDiv>
        <ProdutoDiv>
          <ProdutoNomeDiv>
            <img src='https://td0295.vtexassets.com/arquivos/ids/1760833-800-auto?v=638159785646800000&width=800&height=auto&aspect=true' />
            <span>Legging Hyper Recorte Tule E Silk Cos Violet Indigo M</span>
          </ProdutoNomeDiv>
          <PrecoDiv>
            <span>R$ 254,90</span>
          </PrecoDiv>
          <QuantidadeDiv>
            <QuantidadeInputDiv>
              <QuantidadeButton
                onClick={incrementarQuantidade}
              >
                -
              </QuantidadeButton>
              <QuantidadeInput
                type={'number'}
                value={quantidade}
                onChange={alterarQuantidade}
              />
              <QuantidadeButton
                onClick={decrementarQuantidade}>
                +
              </QuantidadeButton>
            </QuantidadeInputDiv>
          </QuantidadeDiv>
          <TotalDiv>
            <span>R$ 254,90</span>
          </TotalDiv>
        </ProdutoDiv>
        <ProdutoDiv>
          <ProdutoNomeDiv>
            <img src='https://td0295.vtexassets.com/arquivos/ids/1760833-800-auto?v=638159785646800000&width=800&height=auto&aspect=true' />
            <span>Legging Hyper Recorte Tule E Silk Cos Violet Indigo M</span>
          </ProdutoNomeDiv>
          <PrecoDiv>
            <span>R$ 254,90</span>
          </PrecoDiv>
          <QuantidadeDiv>
            <QuantidadeInputDiv>
              <QuantidadeButton
                onClick={incrementarQuantidade}
              >
                -
              </QuantidadeButton>
              <QuantidadeInput
                type={'number'}
                value={quantidade}
                onChange={alterarQuantidade}
              />
              <QuantidadeButton
                onClick={decrementarQuantidade}>
                +
              </QuantidadeButton>
            </QuantidadeInputDiv>
          </QuantidadeDiv>
          <TotalDiv>
            <span>R$ 254,90</span>
          </TotalDiv>
        </ProdutoDiv>
      </ListaCarrinhoDiv>
      <FinalizarDiv>
        <FreteDiv>
        </FreteDiv>
        <FinalizarCarrinhoDiv>
          <span>CEP</span>
          <CupomInput placeholder='Informe o CEP' />
          <br />
          <span>Cupom de Desconto</span>
          <CupomInput placeholder='Código' />
          <br />
          <TotaisDiv>
            <TotaisFinalizarDiv>
              <span>SubTotal</span>
              <span>R$ 457,80</span>
            </TotaisFinalizarDiv>
            <TotaisFinalizarDiv>
              <span>Entrega</span>
              <span>grátis</span>
            </TotaisFinalizarDiv>
            <TotaisFinalizarDiv>
              <b>Total</b>
              <b>R$ 457,80</b>
            </TotaisFinalizarDiv>
          </TotaisDiv>
          <FinalizarButton>
            Finalizar Compra
          </FinalizarButton>
        </FinalizarCarrinhoDiv>
      </FinalizarDiv>
      <Footer />
      <Copyright />
    </Container>
  );
}
