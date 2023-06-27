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
import Context, { ICarrinho, IContext } from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';
import * as FaIcons from 'react-icons/fa';
import { toast } from 'react-toastify';
import useWindowDimensions from '../../utils/WindowDimensions';
import IconeDinamico from '../../components/IconeDinamico';
import { deleteItemCarrinho, postItemCarrinho } from '../ProdutoDetalhes';

export default function Carrinho() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;

  const { configs, carrinho, setCarrinho, dadosLogin }: IContext = useContext(Context);

  const [itensCarrinho, setItensCarrinho] = useState<ICarrinho[]>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');
  const [finalizarCarrinhoNoWhats, setFinalizarCarrinhoNoWhats] = useState<boolean>(false);
  const [numCel, setNumCel] = useState<string>('');
  const [necCadAutMosPro, setNecCadAutMosPro] = useState<boolean>(false);

  async function incrementarQuantidade(codmer: number) {
    const novoCarrinho = itensCarrinho.map((item: ICarrinho) => {
      if (item.codmer === codmer) {
        const itemCarrinhoAtualizado = {
          cod: item.cod, codmer: item.codmer,
          codapp_user: dadosLogin.id, qua: +item.quantidade + 1
        };
        postItemCarrinho(itemCarrinhoAtualizado);
        return { ...item, quantidade: String(+item.quantidade + 1) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
    setItensCarrinho(novoCarrinho);
  }

  function decrementarQuantidade(codmer: number) {
    const novoCarrinho = itensCarrinho.map((item: ICarrinho) => {
      if (item.codmer === codmer) {
        if (+item.quantidade > 1) {
          const itemCarrinhoAtualizado = {
            cod: item.cod, codmer: item.codmer,
            codapp_user: dadosLogin.id, qua: +item.quantidade - 1
          };
          postItemCarrinho(itemCarrinhoAtualizado);
          return { ...item, quantidade: String(+item.quantidade - 1) };
        }
        deleteItemCarrinho(item.cod);
        return;
      }
      return item;
    });

    const novoCarrinhoFilter = novoCarrinho.filter((carrinho: any) => carrinho);
    setCarrinho(novoCarrinhoFilter);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinhoFilter));
    setItensCarrinho(novoCarrinhoFilter);
  }

  function alterarQuantidade(quantidade: number | string, codmer: number) {
    if (quantidade == '0') {
      toast.warning('Quantidade inválida');
      return;
    }

    const novoCarrinho = itensCarrinho.map((item: ICarrinho) => {
      if (item.codmer === codmer) {
        const itemCarrinhoAtualizado = {
          cod: item.cod, codmer: item.codmer,
          codapp_user: dadosLogin.id, qua: Math.round(+quantidade)
        };
        postItemCarrinho(itemCarrinhoAtualizado);
        return { ...item, quantidade: String(Math.round(+quantidade)) };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
    setItensCarrinho(novoCarrinho);
  }

  function finalizarCarrinho() {

    if (finalizarCarrinhoNoWhats) {
      const produtos = itensCarrinho.map((item: ICarrinho) => {
        return `Ref: ${item.codbar} ` + item.mer + ` Tamanho: ${item.codtam ?? ''}` + ` Cor: ${item.cor.padmer ?? ''}` + ` Qtde: ${item.quantidade}` + (necCadAutMosPro ? dadosLogin.autverprosit === 1 ? ` Vlr Unitário: ${formatCurrency(item.valor)}` + '%0A' : '%0A' : ` Vlr Unitário: ${formatCurrency(item.valor)}`+ '%0A');
      });

      const url = 'https://api.whatsapp.com/send?phone=55' + numCel.replace(/\D/g, '') + '&text=Olá!! Gostaria de finalizar meu carrinho:' + '%0A' + produtos;
      setCarrinho([]);
      // localStorage.removeItem('@Carrinho');
      navigate('/');
      window.open(url);
      return;
    }

    if (dadosLogin.id === 0) {
      toast.warning('Faça login para finalizar seu pedido');
      navigate('/login');
      return;
    }

    navigate('/finalizarCarrinho');
  }

  function Preco({ preço }: { preço: number }) {
    if (necCadAutMosPro) {
      if (!dadosLogin.autverprosit) {
        return <span></span>;
      }
    }
    return <span>{formatCurrency(preço)}</span>;
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: falarComVendedor }] = configs.filter((config: any) => config.con === 'botFalVen');
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      const [{ val: numWha }] = configs.filter((config: any) => config.con === 'NumWha');
      const [{ val: CadAutMosPro }] = configs.filter((config: any) => config.con === 'NecCadAutMosPro');

      setFinalizarCarrinhoNoWhats(Boolean(JSON.parse(falarComVendedor ?? 0)));
      setLogoURI('https://' + uri);
      setNumCel(numWha);
      setNecCadAutMosPro(Boolean(+CadAutMosPro));
    }
  }, [configs]);

  useEffect(() => {
    if (carrinho.length > 0) {
      setItensCarrinho(carrinho);
    }
  }, [carrinho]);

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
        {itensCarrinho.map((itemCarrinho: ICarrinho, index: number) =>
          itemCarrinho && !isMobile ?
            <ProdutoDiv key={index}>
              <ProdutoNomeDiv
                onClick={() => navigate(`/produtoDetalhes/${itemCarrinho.codbar}/${itemCarrinho.mer.replaceAll(' ', '-')}`,
                  { state: { caminho: 'Home' } })
                }
              >
                <img src={itemCarrinho?.cor?.linkFot} title={itemCarrinho.cor.padmer} />
                <span>{itemCarrinho?.mer}{' '}{itemCarrinho.codtam}</span>
              </ProdutoNomeDiv>
              <PrecoDiv>
                <Preco preço={itemCarrinho?.valor} />
              </PrecoDiv>
              <QuantidadeDiv>
                <QuantidadeInputDiv>
                  <QuantidadeButton
                    onClick={() => decrementarQuantidade(itemCarrinho?.codmer)}
                  >
                    {itemCarrinho.quantidade == '1' ? <IconeDinamico nome='FaTrashAlt' size={15} /> : '-'}
                  </QuantidadeButton>
                  <QuantidadeInput
                    type={'number'}
                    value={itemCarrinho.quantidade}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (+e.target.value < 0) {
                        return;
                      }
                      alterarQuantidade(e.target.value, itemCarrinho?.codmer);
                    }}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value === '' || e.target.value === '0') {
                        alterarQuantidade('1', itemCarrinho?.codmer);
                      }
                    }}
                  />
                  <QuantidadeButton
                    onClick={() => incrementarQuantidade(itemCarrinho?.codmer)}>
                    +
                  </QuantidadeButton>
                </QuantidadeInputDiv>
              </QuantidadeDiv>
              <TotalDiv>
                {necCadAutMosPro ? dadosLogin.autverprosit === 1 ?
                  <span>{formatCurrency(itemCarrinho?.valor * +(itemCarrinho?.quantidade))}</span> :
                  <span /> : <span>{formatCurrency(itemCarrinho?.valor * +(itemCarrinho?.quantidade))}</span>
                }
              </TotalDiv>
            </ProdutoDiv> :
            <React.Fragment key={index}>
              <ProdutoMobileDiv>
                <ProdutoMobileImageDiv
                  onClick={() => navigate(`/produtoDetalhes/${itemCarrinho.codbar}/${itemCarrinho.mer.replaceAll(' ', '-')}`,
                    { state: { caminho: 'Home' } })
                  }
                >
                  <ProdutoMobileImage src={itemCarrinho?.cor?.linkFot} />
                </ProdutoMobileImageDiv>
                <ProdutoMobileInfoDiv>
                  <span>{itemCarrinho?.mer}{' '}{itemCarrinho.codtam}{' '}{itemCarrinho.cor.padmer}</span>
                  <MobilePrecoDiv>
                    {necCadAutMosPro ? dadosLogin.autverprosit === 1 ?
                      <b>{formatCurrency(itemCarrinho?.valor)}/Un</b> : <b></b> :
                      <b>{formatCurrency(itemCarrinho?.valor)}/Un</b>
                    }
                    <div />
                    <QuantidadeDiv>
                      <QuantidadeInputDiv>
                        <QuantidadeButton
                          onClick={() => decrementarQuantidade(itemCarrinho?.codmer)}
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
                            alterarQuantidade(e.target.value, itemCarrinho?.codmer);
                          }}
                          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value === '' || e.target.value === '0') {
                              alterarQuantidade('1', itemCarrinho?.codmer);
                            }
                          }}
                        />
                        <QuantidadeButton
                          onClick={() => incrementarQuantidade(itemCarrinho?.codmer)}
                        >
                          +
                        </QuantidadeButton>
                      </QuantidadeInputDiv>
                    </QuantidadeDiv>
                  </MobilePrecoDiv>
                </ProdutoMobileInfoDiv>
              </ProdutoMobileDiv>
              <hr />
            </React.Fragment>
        )}
      </ListaCarrinhoDiv>
      <FinalizarDiv>
        <FreteDiv>
        </FreteDiv>
        <FinalizarCarrinhoDiv>
          <span>Cupom de Desconto</span>
          <CupomInput placeholder='Código' />
          <br />
          <TotaisDiv>
            <TotaisFinalizarDiv>
              <span>SubTotal</span>
              {necCadAutMosPro ? dadosLogin.autverprosit === 1 ?
                <span>
                  {formatCurrency(itensCarrinho.reduce(
                    (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                    0
                  ))}
                </span> : <span /> :
                <span>
                  {formatCurrency(itensCarrinho.reduce(
                    (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                    0
                  ))}
                </span>
              }
            </TotaisFinalizarDiv>
            <TotaisFinalizarDiv>
              <b>Total</b>
              {necCadAutMosPro ? dadosLogin.autverprosit === 1 ?
                <b>
                  {formatCurrency(itensCarrinho.reduce(
                    (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                    0
                  ))}
                </b> : <b /> :
                <b>
                  {formatCurrency(itensCarrinho.reduce(
                    (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
                    0
                  ))}
                </b>
              }
            </TotaisFinalizarDiv>
          </TotaisDiv>
          <FinalizarButton disabled={carrinho.length === 0} onClick={finalizarCarrinho}>
            {finalizarCarrinhoNoWhats && <FaIcons.FaWhatsapp size={20} />}
            <span>
              Finalizar Compra
            </span>
          </FinalizarButton>
          <p onClick={() => navigate('/')}>Continuar comprando</p>
        </FinalizarCarrinhoDiv>
      </FinalizarDiv>
      <Footer />
    </Container >
  );
}
