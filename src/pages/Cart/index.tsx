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
import Context, { ICart, IContext } from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';
import * as FaIcons from 'react-icons/fa';
import { toast } from 'react-toastify';
import useWindowDimensions from '../../utils/WindowDimensions';
import DynamicIcon from '../../components/DynamicIcon';
import { deleteCartItem, saveCartItem } from '../ProductDetails';

export default function Cart() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;

  const { configs, cart, setCart, loginData }: IContext = useContext(Context);

  const [itensCarrinho, setItensCarrinho] = useState<ICart[]>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');
  const [finalizarCarrinhoNoWhats, setFinalizarCarrinhoNoWhats] = useState<boolean>(false);
  const [numCel, setNumCel] = useState<string>('');
  const [necCadAutMosPro, setNecCadAutMosPro] = useState<boolean>(false);

  async function incrementarQuantidade(codmer: number) {
    const novoCarrinho = itensCarrinho.map((item: ICart) => {
      if (item.codmer === codmer) {
        const itemCarrinhoAtualizado = {
          cod: item.cod, codmer: item.codmer,
          codapp_user: loginData.id, qua: +item.quantidade + 1
        };
        saveCartItem(itemCarrinhoAtualizado);
        return { ...item, quantidade: String(+item.quantidade + 1) };
      }
      return item;
    });
    setCart(novoCarrinho);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
    setItensCarrinho(novoCarrinho);
  }

  function decrementarQuantidade(codmer: number) {
    const novoCarrinho = itensCarrinho.map((item: ICart) => {
      if (item.codmer === codmer) {
        if (+item.quantidade > 1) {
          const itemCarrinhoAtualizado = {
            cod: item.cod, codmer: item.codmer,
            codapp_user: loginData.id, qua: +item.quantidade - 1
          };
          saveCartItem(itemCarrinhoAtualizado);
          return { ...item, quantidade: String(+item.quantidade - 1) };
        }
        deleteCartItem(item.cod);
        return;
      }
      return item;
    });

    const novoCarrinhoFilter = novoCarrinho.filter((carrinho: any) => carrinho);
    setCart(novoCarrinhoFilter);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinhoFilter));
    setItensCarrinho(novoCarrinhoFilter);
  }

  function alterarQuantidade(quantidade: number | string, codmer: number) {
    if (quantidade == '0') {
      toast.warning('Quantidade inválida');
      return;
    }

    const novoCarrinho = itensCarrinho.map((item: ICart) => {
      if (item.codmer === codmer) {
        const itemCarrinhoAtualizado = {
          cod: item.cod, codmer: item.codmer,
          codapp_user: loginData.id, qua: Math.round(+quantidade)
        };
        saveCartItem(itemCarrinhoAtualizado);
        return { ...item, quantidade: String(Math.round(+quantidade)) };
      }
      return item;
    });
    setCart(novoCarrinho);
    // localStorage.setItem('@Carrinho', JSON.stringify(novoCarrinho));
    setItensCarrinho(novoCarrinho);
  }

  function finalizarCarrinho() {

    if (finalizarCarrinhoNoWhats) {
      const produtos = itensCarrinho.map((item: ICart) => {
        return `Ref: ${item.codbar} ` + item.mer + ` Tamanho: ${item.codtam ?? ''}` + ` Cor: ${item.cor.padmer ?? ''}` + ` Qtde: ${item.quantidade}` + (necCadAutMosPro ? loginData.autverprosit === 1 ? ` Vlr Unitário: ${formatCurrency(item.valor)}` + '%0A' : '%0A' : ` Vlr Unitário: ${formatCurrency(item.valor)}`+ '%0A');
      });

      const url = 'https://api.whatsapp.com/send?phone=55' + numCel.replace(/\D/g, '') + '&text=Olá!! Gostaria de finalizar meu carrinho:' + '%0A' + produtos;
      setCart([]);
      // localStorage.removeItem('@Carrinho');
      navigate('/');
      window.open(url);
      return;
    }

    if (loginData.id === 0) {
      toast.warning('Faça login para finalizar seu pedido');
      navigate('/login');
      return;
    }

    navigate('/checkout');
  }

  function Preco({ preço }: { preço: number }) {
    if (necCadAutMosPro) {
      if (!loginData.autverprosit) {
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
    if (cart.length > 0) {
      setItensCarrinho(cart);
    }
  }, [cart]);

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
        {itensCarrinho.map((itemCarrinho: ICart, index: number) =>
          itemCarrinho && !isMobile ?
            <ProdutoDiv key={index}>
              <ProdutoNomeDiv
                onClick={() => navigate(`/productDetails/${itemCarrinho.codbar}/${itemCarrinho.mer.replaceAll(' ', '-')}`,
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
                    {itemCarrinho.quantidade == '1' ? <DynamicIcon name='FaTrashAlt' size={15} /> : '-'}
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
                {necCadAutMosPro ? loginData.autverprosit === 1 ?
                  <span>{formatCurrency(itemCarrinho?.valor * +(itemCarrinho?.quantidade))}</span> :
                  <span /> : <span>{formatCurrency(itemCarrinho?.valor * +(itemCarrinho?.quantidade))}</span>
                }
              </TotalDiv>
            </ProdutoDiv> :
            <React.Fragment key={index}>
              <ProdutoMobileDiv>
                <ProdutoMobileImageDiv
                  onClick={() => navigate(`/productDetails/${itemCarrinho.codbar}/${itemCarrinho.mer.replaceAll(' ', '-')}`,
                    { state: { caminho: 'Home' } })
                  }
                >
                  <ProdutoMobileImage src={itemCarrinho?.cor?.linkFot} />
                </ProdutoMobileImageDiv>
                <ProdutoMobileInfoDiv>
                  <span>{itemCarrinho?.mer}{' '}{itemCarrinho.codtam}{' '}{itemCarrinho.cor.padmer}</span>
                  <MobilePrecoDiv>
                    {necCadAutMosPro ? loginData.autverprosit === 1 ?
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
              {necCadAutMosPro ? loginData.autverprosit === 1 ?
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
              {necCadAutMosPro ? loginData.autverprosit === 1 ?
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
          <FinalizarButton disabled={cart.length === 0} onClick={finalizarCarrinho}>
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
