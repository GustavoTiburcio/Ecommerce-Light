import React, { useEffect, useState, useContext } from 'react';
import {
  Container, CupomInput, FinalizarButton, FinalizarCarrinhoDiv, FinalizarDiv,
  FreteDiv, HiddenDiv, ListaCarrinhoDiv, Logo, LogoDiv, MobilePrecoDiv, PrecoDiv, ProdutoDiv,
  ProdutoMobileDiv, ProdutoMobileImage, ProdutoMobileImageDiv, ProdutoMobileInfoDiv,
  ProdutoNomeDiv, QuantidadeButton, QuantidadeDiv, QuantidadeInput, QuantidadeInputDiv,
  TituloColunasDiv, TotaisDiv, TotaisFinalizarDiv, TotalDiv
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Context from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';
import * as FaIcons from 'react-icons/fa';
import { toast } from 'react-toastify';
import useWindowDimensions from '../../utils/WindowDimensions';

export default function Carrinho() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;

  const { configs, carrinho, gruposAjuda, setCarrinho }: any = useContext(Context);

  const [itensCarrinho, setItensCarrinho] = useState<any>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');
  const [finalizarCarrinhoNoWhats, setFinalizarCarrinhoNoWhats] = useState<boolean>(false);
  const [numCel, setNumCel] = useState<string>('');

  async function incrementarQuantidade(cod: number) {
    const novoCarrinho = itensCarrinho.map((item: any) => {
      if (item.cod === cod) {
        return { ...item, quantidade: String(+item.quantidade + 1) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
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
    localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinhoFilter));
    setItensCarrinho(novoCarrinhoFilter);
  }

  function alterarQuantidade(quantidade: number | string, cod: number) {
    if (quantidade == '0') {
      toast.warning('Quantidade inválida');
      return;
    }

    const novoCarrinho = itensCarrinho.map((item: any) => {
      if (item.cod === cod) {
        return { ...item, quantidade: String(Math.round(+quantidade)) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
    setItensCarrinho(novoCarrinho);
  }

  function finalizarCarrinho() {

    if (finalizarCarrinhoNoWhats) {
      const produtos = itensCarrinho.map((item: any) => {
        return `Ref: ${item.codbar} ` + item.mer + ` Tamanho: ${item.codTam ?? ''}` + ` Cor: ${item.cor.padmer ?? ''}` +
          ` Qtde: ${item.quantidade}` + ` Vlr Unitário: ${formatCurrency(item.valor)}` + '%0A';
      });

      const url = 'https://api.whatsapp.com/send?phone=55' + numCel + '&text=Olá!! Gostaria de finalizar meu carrinho:' + '%0A' + produtos;
      setCarrinho([]);
      navigate('/');
      window.open(url);
      return;
    }

    toast.warning('Finalizar carrinho pelo site ainda em construção');
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: falarComVendedor }] = configs.filter((config: any) => config.con === 'botFalVen');
      setFinalizarCarrinhoNoWhats(Boolean(JSON.parse(falarComVendedor ?? '0')));

      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  useEffect(() => {
    if (carrinho.length > 0) {
      setItensCarrinho(carrinho);
    }
  }, [carrinho]);

  useEffect(() => {
    if (gruposAjuda.length > 0) {
      const [grupoAjudaCel] = gruposAjuda.filter((config: any) => config.tipo === 'cel');

      if (grupoAjudaCel) {
        const { gruaju: cel } = grupoAjudaCel;
        setNumCel(cel);
      }

    }
  }, [gruposAjuda]);

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
          itemCarrinho && !isMobile ?
            <ProdutoDiv key={index}>
              <ProdutoNomeDiv>
                <img src={itemCarrinho?.cor?.linkFot} title={itemCarrinho.cor.padmer} />
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
                      alterarQuantidade(e.target.value, itemCarrinho?.cod);
                    }}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value === '' || e.target.value === '0') {
                        alterarQuantidade('1', itemCarrinho?.cod);
                      }
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
            </ProdutoDiv> :
            <>
              <ProdutoMobileDiv key={index}>
                <ProdutoMobileImageDiv>
                  <ProdutoMobileImage src={itemCarrinho?.cor?.linkFot} />
                </ProdutoMobileImageDiv>
                <ProdutoMobileInfoDiv>
                  <span>{itemCarrinho?.mer}{' '}{itemCarrinho.codTam}{' '}{itemCarrinho.cor.padmer}</span>
                  <MobilePrecoDiv>
                    <b>{formatCurrency(itemCarrinho?.valor)}/Uni</b>
                    <div />
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
                            alterarQuantidade(e.target.value, itemCarrinho?.cod);
                          }}
                          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === '' || e.target.value === '0') {
                              alterarQuantidade('1', itemCarrinho?.cod);
                            }
                          }}
                        />
                        <QuantidadeButton
                          onClick={() => incrementarQuantidade(itemCarrinho?.cod)}>
                          +
                        </QuantidadeButton>
                      </QuantidadeInputDiv>
                    </QuantidadeDiv>
                  </MobilePrecoDiv>
                </ProdutoMobileInfoDiv>
              </ProdutoMobileDiv>
              <hr />
            </>
        ))}
      </ListaCarrinhoDiv>
      <FinalizarDiv>
        <FreteDiv>
        </FreteDiv>
        <FinalizarCarrinhoDiv>
          {!finalizarCarrinhoNoWhats &&
            <>
              <span>CEP</span>
              <CupomInput placeholder='Informe o CEP' />
              <br />
            </>
          }
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
            {!finalizarCarrinhoNoWhats &&
              <>
                <TotaisFinalizarDiv>
                  <span>Entrega</span>
                  <span>grátis</span>
                </TotaisFinalizarDiv>
              </>
            }
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
          <FinalizarButton disabled={carrinho.length === 0} onClick={finalizarCarrinho}>
            {finalizarCarrinhoNoWhats && <FaIcons.FaWhatsapp size={20} />}
            <span>
              Finalizar Compra
            </span>
          </FinalizarButton>
        </FinalizarCarrinhoDiv>
      </FinalizarDiv>
      <Footer />
    </Container>
  );
}
