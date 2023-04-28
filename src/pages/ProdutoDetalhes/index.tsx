import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Container, ContainerMobile, CoresDiv, CorTamanhoDiv, DescricaoProdutoDiv,
  DetalhesDiv, FreteDiv, FreteInput, FreteInputDiv, ImageCarouselContainer,
  ImageCarouselDiv, NavDiv, NavDivCarrinho, PaletaCoresDiv,
  PaletaTamanhosDiv, PrecoDiv, ProdutoInfoDiv, QuantidadeButton, QuantidadeInput,
  QuantidadeInputDiv,
  Ref, TamanhosDiv, Titulo
} from './styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import * as AiIcons from 'react-icons/ai';
import Footer from '../../components/Footer';
import * as FiIcons from 'react-icons/fi';
import Accordion from '../../components/Accordion';
import Cores from '../../components/Cores/Index';
import Tamanhos from '../../components/Tamanhos';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/Context';
import AvaliacaoProduto from '../../components/AvaliacaoProduto';
import useWindowDimensions from '../../utils/WindowDimensions';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

interface ProdutoCarrinhoProps {
  cod: string | number;
  mer: string;
  codbar?: string;
  codTam: string;
  cor: CorSelecionadaProps;
  padMerLinkFot?: string;
  quantidade: string | number;
  valor: string | number;
}

interface CorSelecionadaProps {
  cod: string;
  isSelected?: boolean;
  linkFot: string;
  padmer: string;
}

export default function ProdutoDetalhes() {
  // const location = useLocation();
  const { codbar } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const pularTutorial = localStorage.getItem('@Acessado');

  const { carrinho, setCarrinho, configs }: any = useContext(Context);

  const [quantidade, setQuantidade] = useState<string>('1');
  const [corSelecionada, setCorSelecionada] = useState<CorSelecionadaProps>({ cod: '', padmer: '', linkFot: '' });
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('');
  const [fotos, setFotos] = useState<any>([]);
  const [produtoDetalhes, setProdutoDetalhes] = useState<any>([]);
  const [desSit, setDesSit] = useState<any>([]);

  const [tamanhos, setTamanhos] = useState<any>([]);
  const [cores, setCores] = useState<any>([]);
  const [indexCarousel, setIndexCarousel] = useState<number>(0);

  const [runTutorial, setRunTutorial] = useState(false);

  //configs
  const [finalizarCarrinhoNoWhats, setFinalizarCarrinhoNoWhats] = useState<boolean>(false);

  const steps = [
    {
      target: '.buttonFavoritar-step',
      content: 'Clique no botão para salvar esse produto na sua lista de desejos',
      disableBeacon: true,
      title: 'Tô aqui pra te ajudar 😜',
    },
    {
      target: '.cores-step',
      content: 'Aqui você escolhe a cor que deseja!',
      disableBeacon: true,
      title: 'Cores disponíveis',
    },
    {
      target: '.tamanhos-step',
      content: 'Aqui você escolhe o tamanho!',
      disableBeacon: true,
      title: 'Tamanhos disponíveis',
    },
    {
      target: '.quantidade-step',
      content: 'Informe a quantidade desejada',
      disableBeacon: true,
      title: 'Quantidade',
    },
    {
      target: '.buttonCarrinho-step',
      content: 'Depois de tudo, só dar um clique aqui',
      disableBeacon: true,
      title: 'Mandar pro Carrinho 👌',
    },
  ];

  async function getProdutoDetalhes(codbar: string) {
    try {
      const response = await api.get(`/mercador/listarParaDetalhes?codbar=${codbar}&CODTABPRE=0`);
      if (response.status === 200) {
        const tamanhosProd = response.data.tamanhos.map((tamanho: any) => {
          return { tamanho: tamanho, isSelected: false };
        });

        const coresProd = response.data.cores.map((cor: any) => {
          const corPorFoto = response.data.fotos.filter((foto: any) => foto.codpad === cor.cod);
          return { cod: cor.cod, padmer: cor.padmer, linkFot: corPorFoto[0]?.linkfot ? 'https://' + corPorFoto[0]?.linkfot : 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg', isSelected: false };
        });

        setTamanhos(tamanhosProd);
        setCores(coresProd);
        setFotos(response.data?.fotos);
        setProdutoDetalhes(response.data);
        setDesSit([
          { titulo: 'Descrição do Produto', conteudo: response.data?.desSit }
        ]);
        setRunTutorial(true);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar detalhes do produto ' + error.message);
    }
  }

  function decrementarQuantidade() {
    if (+quantidade <= 1) {
      return;
    }
    setQuantidade(prev => {
      return String(+prev - 1);
    });
  }

  function incrementarQuantidade() {
    setQuantidade(prev => {
      return String(+prev + 1);
    });
  }

  function alterarQuantidade(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value >= 0) {
      setQuantidade(String(Math.round(+e.target.value)));
    }
  }

  function addProdutoNoCarrinho({ cod, codbar, mer, codTam, cor, quantidade, valor }: ProdutoCarrinhoProps) {
    const novoProduto = [{ cod, codbar, mer, codTam, cor, quantidade, valor }];

    if (quantidade == 0) {
      toast.warning('Quantidade inválida');
      return;
    }

    if (produtoDetalhes?.tamanhos.length > 0 && !codTam) {
      toast.warning('Selecione o tamanho');
      return;
    }

    if (produtoDetalhes?.cores.length > 0 && !cor.cod) {
      toast.warning('Selecione a cor');
      return;
    }

    if (produtoDetalhes?.cores.length === 0) {
      novoProduto[0]['cor'] = {
        cod: '', padmer: 'ÚNICA',
        linkFot: fotos[0]?.linkfot ? 'https://' + fotos[0]?.linkfot : 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg'
      };
    }

    if (!cod) {
      toast.error('Código não encontrado');
      return;
    }

    const carrinhoAtual = carrinho;
    const [produtoJaEstaNoCarrinho] = carrinho.filter((item: any) => item.cod === cod);

    if (produtoJaEstaNoCarrinho) {
      carrinhoAtual[carrinhoAtual.indexOf(produtoJaEstaNoCarrinho)]['quantidade'] = +(carrinhoAtual[carrinhoAtual.indexOf(produtoJaEstaNoCarrinho)].quantidade) + Math.floor(+(quantidade));
      setCarrinho(carrinhoAtual);
      localStorage.setItem('@Carrinho', JSON.stringify(carrinhoAtual));
      toast.success(
        `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codTam ? '- ' + codTam.toUpperCase() : ''} Foi adicionado ao carrinho`
      );
      return;
    }

    setCarrinho([...carrinho, ...novoProduto]);
    localStorage.setItem('@Carrinho', JSON.stringify([...carrinho, ...novoProduto]));
    toast.success(
      `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codTam ? '- ' + codTam.toUpperCase() : ''} Foi adicionado ao carrinho`
    );
  }

  function tutorialCallback(data: CallBackProps) {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      localStorage.setItem('@Acessado', 'true');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    getProdutoDetalhes(codbar ?? '');
  }, []);

  useEffect(() => {
    if (produtoDetalhes?.fotos) {
      const fotosCorSelecionada = produtoDetalhes.fotos.filter((foto: any) => foto.codpad === corSelecionada.cod);
      if (fotosCorSelecionada.length > 0) {
        setFotos(fotosCorSelecionada);
        setIndexCarousel(0);
        return;
      }
      setFotos([{
        codpad: corSelecionada.cod, linkfot: 'darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg'
      }]);
      setIndexCarousel(0);
      return;
    }
  }, [corSelecionada]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: falarComVendedor }] = configs.filter((config: any) => config.con === 'botFalVen');
      setFinalizarCarrinhoNoWhats(Boolean(JSON.parse(falarComVendedor ?? '0')));
    }
  }, [configs]);

  return (
    <>
      {!pularTutorial && <Joyride
        run={runTutorial}
        steps={steps}
        callback={tutorialCallback}
        continuous
        hideCloseButton
        showSkipButton
        disableScrolling={!isMobile}
        scrollOffset={70}
        locale={{
          back: 'Voltar', close: 'Fechar', last: 'Fechar',
          next: 'Próximo', open: 'Abrir caixa', skip: 'Pular'
        }}
        styles={{
          options: {
            primaryColor: '#000', // Cor principal do botão
          }
        }}
      />}
      {!isMobile ?
        <Container>
          <DetalhesDiv>
            <ImageCarouselDiv>
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={true}
                swipeable={true}
                emulateTouch={true}
                infiniteLoop
                selectedItem={indexCarousel}
                onChange={setIndexCarousel}
              >
                {fotos.length > 0 && fotos.map((foto: any, index: number) => (
                  <ImageCarouselContainer key={index}>
                    <img
                      src={'https://' + foto.linkfot}
                    />
                  </ImageCarouselContainer>
                ))}
              </Carousel>
            </ImageCarouselDiv>
            <ProdutoInfoDiv>
              <NavDiv>
                {/* <span>{!location?.state?.caminho ? 'Home' : location?.state?.caminho}</span> */}
                <span onClick={() => navigate('/')}>{'Home'}</span>
                <Button className='buttonFavoritar-step'>
                  Favoritar
                  <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
                </Button>
              </NavDiv>
              <hr />
              <Titulo>
                {produtoDetalhes?.mer ?? ''}
              </Titulo>
              <Ref>
                Ref: {codbar ?? ''}
              </Ref>
              <PrecoDiv>
                <b>
                  {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin)}
                </b>
                {produtoDetalhes?.quaParValMax !== 1 &&
                  <span>
                    {produtoDetalhes?.quaParValMax && produtoDetalhes?.quaParValMax + ' x '}
                    {produtoDetalhes?.valVenMin && produtoDetalhes?.quaParValMax && formatCurrency(produtoDetalhes?.valVenMin / produtoDetalhes?.quaParValMax)}
                  </span>
                }
              </PrecoDiv>
              <CorTamanhoDiv>
                {cores.length > 0 &&
                  <CoresDiv className='cores-step'>
                    <span>Cor</span>
                    <PaletaCoresDiv>
                      <Cores setCorSelecionada={setCorSelecionada} coresLista={cores} />
                    </PaletaCoresDiv>
                  </CoresDiv>
                }
                {tamanhos.length > 0 &&
                  <TamanhosDiv className='tamanhos-step'>
                    <span>Tamanho</span>
                    <PaletaTamanhosDiv>
                      <Tamanhos setTamanhoSelecionado={setTamanhoSelecionado} tamanhosLista={tamanhos} />
                    </PaletaTamanhosDiv>
                  </TamanhosDiv>
                }
              </CorTamanhoDiv>
              <hr />
              <NavDivCarrinho>
                {!finalizarCarrinhoNoWhats &&
                  <FreteDiv>
                    <span>
                      CALCULE O FRETE E PRAZO DE ENTREGA
                    </span>
                    <FreteInputDiv>

                      <>
                        <FreteInput placeholder='CEP' />
                        <FiIcons.FiSearch color='#000' style={{ cursor: 'pointer', width: '10%', height: '100%' }} />
                      </>

                    </FreteInputDiv>
                  </FreteDiv>
                }
                <QuantidadeInputDiv className='quantidade-step'>
                  <QuantidadeButton
                    onClick={decrementarQuantidade}
                  >
                    -
                  </QuantidadeButton>
                  <QuantidadeInput
                    type={'number'}
                    value={quantidade}
                    onChange={alterarQuantidade}
                  />
                  <QuantidadeButton
                    onClick={incrementarQuantidade}>
                    +
                  </QuantidadeButton>
                </QuantidadeInputDiv>
                <Button
                  backgroundColor='#000'
                  onClick={() => {
                    const codmer = produtoDetalhes?.detalhes.filter((produto: any) =>
                      produto.tamanho == tamanhoSelecionado && (produto?.cor ? produto.cor === corSelecionada.padmer : true)
                    );

                    addProdutoNoCarrinho({
                      cod: codmer[0]?.codigo ?? '', codbar: codbar, mer: produtoDetalhes?.mer, codTam: tamanhoSelecionado, cor: corSelecionada,
                      quantidade: String(Math.floor(+quantidade)), valor: codmer[0]?.valor ?? 0
                    });
                  }}
                  className='buttonCarrinho-step'
                >
                  Adicionar ao Carrinho
                  <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} />
                </Button>
              </NavDivCarrinho>
              <hr />
              <DescricaoProdutoDiv>
                {desSit.length > 0 && desSit.map((descricao: any, index: any) => (
                  <Accordion key={index} titulo={descricao.titulo} conteudo={descricao.conteudo} />
                ))}
              </DescricaoProdutoDiv>
              <hr />
              <AvaliacaoProduto codbar={codbar} />
            </ProdutoInfoDiv>
          </DetalhesDiv>
        </Container> :
        <ContainerMobile>
          <div style={{ marginLeft: -10 }}>
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              swipeable={true}
              emulateTouch={true}
              infiniteLoop
              selectedItem={indexCarousel}
              onChange={setIndexCarousel}
            >
              {fotos.length > 0 && fotos.map((foto: any, index: number) => (
                <ImageCarouselContainer key={index}>
                  <img
                    src={'https://' + foto.linkfot}
                  />
                </ImageCarouselContainer>
              ))}
            </Carousel>
          </div>
          <NavDiv>
            <span onClick={() => navigate('/')}>{'Home'}</span>
            <Button className='buttonFavoritar-step'>
              Favoritar
              <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDiv>
          <hr />
          <Titulo>
            {produtoDetalhes?.mer ?? ''}
          </Titulo>
          <Ref>
            Ref: {codbar ?? ''}
          </Ref>
          <PrecoDiv>
            <b>
              {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin)}
            </b>
            {produtoDetalhes?.quaParValMax !== 1 &&
              <span>
                {produtoDetalhes?.quaParValMax && produtoDetalhes?.quaParValMax + ' x '}
                {produtoDetalhes?.valVenMin && produtoDetalhes?.quaParValMax && formatCurrency(produtoDetalhes?.valVenMin / produtoDetalhes?.quaParValMax)}
              </span>
            }
          </PrecoDiv>
          <CorTamanhoDiv isMobile={isMobile}>
            {cores.length > 0 && <CoresDiv className='cores-step'>
              <span>Cor</span>
              <PaletaCoresDiv>
                <Cores setCorSelecionada={setCorSelecionada} coresLista={cores} />
              </PaletaCoresDiv>
            </CoresDiv>
            }
            {tamanhos.length > 0 && <TamanhosDiv className='tamanhos-step'>
              <span>Tamanho</span>
              <PaletaTamanhosDiv>
                <Tamanhos setTamanhoSelecionado={setTamanhoSelecionado} tamanhosLista={tamanhos} />
              </PaletaTamanhosDiv>
            </TamanhosDiv>
            }
          </CorTamanhoDiv>
          <hr />
          {!finalizarCarrinhoNoWhats &&
            <>
              <br />
              <FreteDiv>
                <span>
                  CALCULE O FRETE E PRAZO DE ENTREGA
                </span>
                <FreteInputDiv>
                  <>
                    <FreteInput placeholder='CEP' />
                    <FiIcons.FiSearch color='#000' style={{ cursor: 'pointer', width: '10%', height: '100%' }} />
                  </>
                </FreteInputDiv>
              </FreteDiv>
              <br />
              <hr />
            </>
          }
          <DescricaoProdutoDiv>
            {desSit.length > 0 && desSit.map((descricao: any, index: any) => (
              <Accordion key={index} titulo={descricao.titulo} conteudo={descricao.conteudo} />
            ))}
          </DescricaoProdutoDiv>
          <NavDivCarrinho>
            <QuantidadeInputDiv className='quantidade-step'>
              <QuantidadeButton
                onClick={decrementarQuantidade}
              >
                -
              </QuantidadeButton>
              <QuantidadeInput
                type={'number'}
                value={quantidade}
                onChange={alterarQuantidade}
              />
              <QuantidadeButton
                onClick={incrementarQuantidade}>
                +
              </QuantidadeButton>
            </QuantidadeInputDiv>
            <Button
              className='buttonCarrinho-step'
              backgroundColor='#000'
              onClick={() => {
                const codmer = produtoDetalhes?.detalhes.filter((produto: any) =>
                  produto.tamanho == tamanhoSelecionado && (produto?.cor ? produto.cor === corSelecionada.padmer : true)
                );

                addProdutoNoCarrinho({
                  cod: codmer[0]?.codigo ?? '', codbar: codbar, mer: produtoDetalhes?.mer, codTam: tamanhoSelecionado, cor: corSelecionada,
                  quantidade: String(Math.floor(+quantidade)), valor: codmer[0]?.valor ?? 0
                });
              }}
            >
              {isMobile ? 'Comprar' : 'Adicionar ao Carrinho'}
              <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDivCarrinho>
          <hr />
          <AvaliacaoProduto codbar={codbar} />
        </ContainerMobile>
      }
      <Footer />
    </>
  );
}
