import React, { useEffect, useState, useContext } from 'react';
import {
  Container, CupomInput, FinalizarButton, FinalizarCarrinhoDiv, FinalizarDiv,
  FreteDiv, HiddenDiv, ListaCarrinhoDiv, Logo, LogoDiv, PrecoDiv, ProdutoDiv,
  ProdutoNomeDiv, QuantidadeButton, QuantidadeDiv, QuantidadeInput, QuantidadeInputDiv,
  TituloColunasDiv, TotaisDiv, TotaisFinalizarDiv, TotalDiv
} from './styles';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Context from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Carrinho() {
  const { configs, carrinho, setCarrinho }: any = useContext(Context);

  const [itensCarrinho, setItensCarrinho] = useState<any>(carrinho);

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  async function incrementarQuantidade(cod: number) {
    const novoCarrinho = itensCarrinho.map((item: any) => {
      if (item.cod === cod) {
        return { ...item, quantidade: String(+item.quantidade + 1) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    setItensCarrinho(novoCarrinho);
  }

  function decrementarQuantidade(cod: number) {
    const novoCarrinho = itensCarrinho.map((item: any) => {
      if (item.cod === cod) {
        if (item.quantidade > 1) {
          return { ...item, quantidade: String(+item.quantidade - 1) };
        }
        return;
      }
      return item;
    });

    const novoCarrinhoFilter = novoCarrinho.filter((carrinho: any) => carrinho);
    setCarrinho(novoCarrinhoFilter);
    setItensCarrinho(novoCarrinhoFilter);
  }

  function alterarQuantidade(e: React.ChangeEvent<HTMLInputElement>, cod: number) {
    // if (+e.target.value) {

    // }
    const novoCarrinho = itensCarrinho.map((item: any) => {
      if (item.cod === cod) {
        return { ...item, quantidade: e.target.value };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    setItensCarrinho(novoCarrinho);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  return (
    <Container>
      <LogoDiv>
        <HiddenDiv />
        <Link to={'/'}>
          {logoURI && <Logo src={logoURI} alt='Logo' />}
        </Link>
        <span>Compra 100% Segura</span>
      </LogoDiv>
      <hr />
      <b>Meu carrinho</b>
      <ListaCarrinhoDiv>
        <TituloColunasDiv>
          <span className='produto'>Lista de Produtos</span>
          <span className='preco'>Preço Unitário</span>
          <span className='quantidade'>Quantidade</span>
          <span className='total'>Total</span>
        </TituloColunasDiv>
        {itensCarrinho.map((itemCarrinho: any, index: number) => (
          itemCarrinho &&
          <ProdutoDiv key={index}>
            <ProdutoNomeDiv>
              <img src={itemCarrinho?.cor?.linkFot} title={itemCarrinho.cor.padmer}/>
              <span>{itemCarrinho?.mer}{' '}{itemCarrinho.codTam}</span>
            </ProdutoNomeDiv>
            <PrecoDiv>
              <span>{formatCurrency(itemCarrinho?.valor)}</span>
            </PrecoDiv>
            <QuantidadeDiv>
              <QuantidadeInputDiv>
                <QuantidadeButton
                  onClick={() => decrementarQuantidade(itemCarrinho?.cod)}
                >
                  -
                </QuantidadeButton>
                <QuantidadeInput
                  type={'number'}
                  value={itemCarrinho.quantidade}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (+e.target.value < 0) {
                      return;
                    }
                    alterarQuantidade(e, itemCarrinho?.cod);
                  }}
                />
                <QuantidadeButton
                  onClick={() => incrementarQuantidade(itemCarrinho?.cod)}>
                  +
                </QuantidadeButton>
              </QuantidadeInputDiv>
            </QuantidadeDiv>
            <TotalDiv>
              <span>{formatCurrency(itemCarrinho?.valor * +(itemCarrinho?.quantidade))}</span>
            </TotalDiv>
          </ProdutoDiv>
        ))}
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
              <span>
                {formatCurrency(itensCarrinho.reduce(
                  (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                  0
                ))}
              </span>
            </TotaisFinalizarDiv>
            <TotaisFinalizarDiv>
              <span>Entrega</span>
              <span>grátis</span>
            </TotaisFinalizarDiv>
            <TotaisFinalizarDiv>
              <b>Total</b>
              <b>
                {formatCurrency(itensCarrinho.reduce(
                  (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                  0
                ))}
              </b>
            </TotaisFinalizarDiv>
          </TotaisDiv>
          <FinalizarButton>
            Finalizar Compra
          </FinalizarButton>
        </FinalizarCarrinhoDiv>
      </FinalizarDiv>
      <Footer />
    </Container>
  );
}
