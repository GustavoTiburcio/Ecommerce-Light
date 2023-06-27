import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Container, ContainerMobile, CoresDiv, CorTamanhoDiv, DescricaoProdutoDiv,
  DetalhesDiv, EsgotadoText, FreteDiv, FreteInput, FreteInputDiv, ImageCarouselContainer,
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
import Context, { ICarrinho, IContext, ICorSelecionada } from '../../context/Context';
import AvaliacaoProduto from '../../components/AvaliacaoProduto';
import useWindowDimensions from '../../utils/WindowDimensions';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { BuscaEndereco } from '../../utils/buscaCep';

export interface IIteCar {
  cod: number | undefined,
  codmer: number,
  codapp_user: number,
  qua: number
}

export async function postItemCarrinho({ cod, codmer, codapp_user, qua }: IIteCar) {
  try {
    const payload = { cod, codmer, codapp_user, qua };

    if (codapp_user === 0) return;

    const response = await api.post('/itecar/salvar', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    console.log('Falha ao salvar carrinho na nuvem.' + error.message);
  }
}

export async function deleteItemCarrinho(cod: number | undefined) {
  try {
    if (!cod) return;
    await api.delete(`/itecar/delete?id=${cod}`);
  } catch (error: any) {
    console.log('Falha ao apagar item do carrinho na nuvem.' + error.message);
  }
}

export default function ProdutoDetalhes() {
  // const location = useLocation();
  const { codbar } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const pularTutorial = localStorage.getItem('@Acessado');

  const {
    carrinho, setCarrinho,
    configs, dadosLogin
  }: IContext = useContext(Context);

  const [quantidade, setQuantidade] = useState<string>('1');
  const [corSelecionada, setCorSelecionada] = useState<ICorSelecionada>({ cod: '', padmer: '', linkFot: '' });
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
  const [quaMaxPar, setQuaMaxPar] = useState(1);
  const [valMinPar, setValMinPar] = useState(1);
  const [keyApiGoo, setKeyApiGoo] = useState<string>('0');
  const [numCel, setNumCel] = useState<string>('');
  const [NecCadAutMosPro, setNecCadAutMosPro] = useState<boolean>(false);

  //frete
  const [fre, setFre] = useState<undefined | number>();
  const [cepFre, setCepFre] = useState<string>('');


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

  async function addProdutoNoCarrinho({ codmer, codbar, mer, codtam, cor, quantidade, valor }: ICarrinho) {
    const novoProduto: any = [{ codmer, codbar, mer, codtam, cor, quantidade, valor }];

    if (quantidade == '0') {
      toast.warning('Quantidade inválida');
      return;
    }
    if (!valor) {
      toast.warning('Preço do produto está inválido, entre em contato com a loja.');
      return;
    }

    if (produtoDetalhes?.tamanhos.length > 0 && !codtam) {
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

    if (!codmer) {
      toast.error('Código do produto não encontrado');
      return;
    }

    const carrinhoAtual = carrinho;
    const [produtoJaEstaNoCarrinho] = carrinho.filter((item: ICarrinho) => item.codmer === codmer);

    if (produtoJaEstaNoCarrinho) {
      const index = carrinhoAtual.indexOf(produtoJaEstaNoCarrinho);
      carrinhoAtual[index]['quantidade'] = String(+(carrinhoAtual[index].quantidade) + Math.floor(+(quantidade)));
      const itemCarrinhoAtualizado = {
        cod: carrinhoAtual[index].cod, codmer: carrinhoAtual[index].codmer,
        codapp_user: dadosLogin.id, qua: +carrinhoAtual[index].quantidade
      };

      postItemCarrinho(itemCarrinhoAtualizado);
      setCarrinho(carrinhoAtual);
      // localStorage.setItem('@Carrinho', JSON.stringify(carrinhoAtual));
      toast.success(
        `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codtam ? '- ' + codtam.toUpperCase() : ''} Foi adicionado ao carrinho`
      );
      return;
    }

    const novoItemCarrinho: IIteCar = { cod: undefined, codmer: novoProduto[0].codmer, codapp_user: dadosLogin.id, qua: +novoProduto[0].quantidade };

    const iteCarSalvo = await postItemCarrinho(novoItemCarrinho);
    if (iteCarSalvo) {
      novoProduto[0]['cod'] = iteCarSalvo.cod;
    }

    setCarrinho([...carrinho, ...novoProduto]);
    // localStorage.setItem('@Carrinho', JSON.stringify([...carrinho, ...novoProduto]));
    toast.success(
      `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codtam ? '- ' + codtam.toUpperCase() : ''} Foi adicionado ao carrinho`
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

  function ComprarPeloWhatsApp() {
    const produtos = `Ref: ${codbar} ` + produtoDetalhes?.mer + ` Tamanho: ${tamanhoSelecionado}` + ` Cor: ${corSelecionada.padmer}` +
      ` Qtde: ${quantidade}` + ` Vlr Unitário: ${formatCurrency(produtoDetalhes?.valVenMin)}` + '%0A' + 'https://' + fotos[indexCarousel].linkfot;

    const url = 'https://api.whatsapp.com/send?phone=55' + numCel.replace(/\D/g, '') + '&text=Olá!! Vim pelo site e estou interessado no item:' + '%0A' + produtos;

    window.open(url);
  }

  async function adicionarListaDeDesejo() {
    try {
      if (dadosLogin.id === 0) {
        toast.warning('Faça login para montar sua lista de desejos');
        navigate('/login');
        return;
      }

      const response = await api.get(`/itelisdes/listarPorUsuario?id=${dadosLogin.id}`);
      let produtoJaEstaNaLista = [];

      if (response.data !== 'Produto não encontrado') {
        produtoJaEstaNaLista = response.data.content.filter((e: any) => e.codBar === codbar);
      }

      if (produtoJaEstaNaLista.length > 0) {
        await api.delete(`/itelisdes/delete?id=${produtoJaEstaNaLista[0].codIteLisDes}`);
        toast.success(`${produtoDetalhes?.mer} foi removido da sua lista de desejos.`);
        return;
      }

      const payload = {
        codmer: produtoDetalhes.detalhes[0].codigo,
        codapp_user: dadosLogin.id
      };

      await api.post('/itelisdes/salvar', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success(`${produtoDetalhes?.mer} foi adicionado a sua lista de desejos.`);

    } catch (error: any) {
      toast.error('Falha ao salvar na lista de desejos. ' + error.message);
    }
  }

  //calcula frete viverde
  async function calcularFrete(endereco: any) {
    try {
      if (keyApiGoo !== '0') {
        const destino = endereco.log + ', ' +
          endereco.num + ' - ' + endereco.bai + ', ' + endereco.cid + ' - ' +
          endereco.uf + ', ' + endereco.cep;
        const response = await api.get(`/pedidos/CalcularDistanciaParaEntregar?destino=${destino}`);
        if (response.status === 200) {
          if (response.data.length > 0) {
            setFre(+(response.data[0].valor.replace(',', '.')));
          }
        }
      }
    } catch (error: any) {
      toast.error('Falha ao calcular frete. ' + error.message);
    }
  }

  async function buscaCep() {
    setFre(undefined);
    if (cepFre.length < 8) {
      toast.warning('Cep infomado é inválido');
      return;
    }

    const dadosEndereco = await BuscaEndereco(cepFre);
    if (dadosEndereco) {
      calcularFrete({
        log: dadosEndereco.logradouro, num: '', bai: dadosEndereco.bairro,
        cid: dadosEndereco.localidade, uf: dadosEndereco.uf, cep: dadosEndereco.cep
      });
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
      const [{ val: quaMaxPar }] = configs.filter((config: any) => config.con === 'quamaxpar');
      const [{ val: valminpar }] = configs.filter((config: any) => config.con === 'valminpar');
      const [{ val: keyApiGoo }] = configs.filter((config: any) => config.con === 'KeyApiGoo');
      const [{ val: numWha }] = configs.filter((config: any) => config.con === 'NumWha');
      const [{ val: CadAutMosPro }] = configs.filter((config: any) => config.con === 'NecCadAutMosPro');

      setFinalizarCarrinhoNoWhats(Boolean(JSON.parse(falarComVendedor ?? '0')));
      setQuaMaxPar(quaMaxPar);
      setValMinPar(valminpar);
      setKeyApiGoo(keyApiGoo);
      setNumCel(numWha);
      setNecCadAutMosPro(Boolean(+CadAutMosPro));
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
            primaryColor: '#000'
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
                thumbWidth={fotos.length < 10 ? 60 : 40}
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
                <Button className='buttonFavoritar-step' onClick={adicionarListaDeDesejo}>
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
              {produtoDetalhes.esgSit === 1 && <EsgotadoText>Esgotado</EsgotadoText>}
              {NecCadAutMosPro ?
                dadosLogin.autverprosit === 1 ?
                  <PrecoDiv>
                    <b>
                      {(produtoDetalhes?.valVenMin !== 0 && formatCurrency(produtoDetalhes?.valVenMin)) || ''}
                    </b>
                    {quaMaxPar > 1 && (produtoDetalhes?.valVenMin / quaMaxPar) >= valMinPar &&
                      <span>
                        {quaMaxPar + ' x '}
                        {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin / quaMaxPar)}
                      </span>
                    }
                  </PrecoDiv> : <></> :
                <PrecoDiv>
                  <b>
                    {(produtoDetalhes?.valVenMin !== 0 && formatCurrency(produtoDetalhes?.valVenMin)) || ''}
                  </b>
                  {quaMaxPar > 1 && (produtoDetalhes?.valVenMin / quaMaxPar) >= valMinPar &&
                    <span>
                      {quaMaxPar + ' x '}
                      {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin / quaMaxPar)}
                    </span>
                  }
                </PrecoDiv>
              }
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
                {!finalizarCarrinhoNoWhats && api.defaults.baseURL !== 'https://viverde-api.herokuapp.com/api' &&
                  <FreteDiv>
                    <span>
                      CALCULE O FRETE E PRAZO DE ENTREGA
                    </span>
                    <FreteInputDiv>
                      <>
                        <FreteInput
                          placeholder='CEP'
                          value={cepFre} onChange={(e: any) => setCepFre(e.target.value.replace(/\D/g, ''))}
                          onBlur={(e: any) => {
                            if (e.target.value.replace(/\D/g, '').length !== 8) {
                              setCepFre('');
                            }
                          }} />
                        <FiIcons.FiSearch
                          color='#000'
                          style={{ cursor: 'pointer', width: '10%', height: '100%' }}
                          onClick={buscaCep}
                        />
                      </>
                      {fre && <strong>&nbsp;&nbsp;{formatCurrency(fre)}</strong>}
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
                  backgroundColor={api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ? '#000' : '#48DE55'}
                  onClick={() => {
                    if (api.defaults.baseURL === 'https://killar-api.herokuapp.com/api') {
                      ComprarPeloWhatsApp();
                      return;
                    }

                    const codmer = produtoDetalhes?.detalhes.filter((produto: any) =>
                      produto.tamanho == tamanhoSelecionado && (produto?.cor ? produto.cor === corSelecionada.padmer : true)
                    );

                    addProdutoNoCarrinho({
                      codmer: codmer[0]?.codigo ?? '', codbar: produtoDetalhes?.codBar, mer: produtoDetalhes?.mer, codtam: tamanhoSelecionado, cor: corSelecionada,
                      quantidade: String(Math.floor(+quantidade)), valor: codmer[0]?.valor ?? 0
                    });
                  }}
                  className='buttonCarrinho-step'
                  disabled={Boolean(produtoDetalhes?.esgSit)}
                >
                  {api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ? 'Adicionar ao Carrinho' : 'Compre pelo WhatsApp'}
                  {api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ?
                    <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} /> :
                    <AiIcons.AiOutlineWhatsApp style={{ marginLeft: 10 }} size={25} />
                  }
                </Button>
              </NavDivCarrinho>
              <hr />
              <DescricaoProdutoDiv>
                {desSit.length > 0 && desSit.map((descricao: any, index: any) => (
                  <Accordion key={index} titulo={descricao.titulo} texto={descricao.conteudo} />
                ))}
              </DescricaoProdutoDiv>
              <hr />
              <AvaliacaoProduto codbar={codbar} />
            </ProdutoInfoDiv>
          </DetalhesDiv >
        </Container > :
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
            <Button className='buttonFavoritar-step' onClick={adicionarListaDeDesejo}>
              Favoritar
              <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDiv>
          <hr />
          <Titulo>
            {produtoDetalhes?.mer ?? ''} {' '} {corSelecionada?.padmer ?? ''}
          </Titulo>
          <Ref>
            Ref: {codbar ?? ''}
          </Ref>
          {produtoDetalhes.esgSit === 1 && <EsgotadoText>Esgotado</EsgotadoText>}
          {NecCadAutMosPro ?
            dadosLogin.autverprosit === 1 ?
              <PrecoDiv>
                <b>
                  {(produtoDetalhes?.valVenMin !== 0 && formatCurrency(produtoDetalhes?.valVenMin)) || ''}
                </b>
                {quaMaxPar > 1 && (produtoDetalhes?.valVenMin / quaMaxPar) >= valMinPar &&
                  <span>
                    {quaMaxPar + ' x '}
                    {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin / quaMaxPar)}
                  </span>
                }
              </PrecoDiv> : <></> :
            <PrecoDiv>
              <b>
                {(produtoDetalhes?.valVenMin !== 0 && formatCurrency(produtoDetalhes?.valVenMin)) || ''}
              </b>
              {quaMaxPar > 1 && (produtoDetalhes?.valVenMin / quaMaxPar) >= valMinPar &&
                <span>
                  {quaMaxPar + ' x '}
                  {produtoDetalhes?.valVenMin && formatCurrency(produtoDetalhes?.valVenMin / quaMaxPar)}
                </span>
              }
            </PrecoDiv>
          }
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
          {!finalizarCarrinhoNoWhats && api.defaults.baseURL !== 'https://viverde-api.herokuapp.com/api' &&
            <>
              <br />
              <FreteDiv>
                <span>
                  CALCULE O FRETE E PRAZO DE ENTREGA
                </span>
                <FreteInputDiv>
                  <>
                    <FreteInput
                      placeholder='CEP'
                      value={cepFre} onChange={(e: any) => setCepFre(e.target.value.replace(/\D/g, ''))}
                      onBlur={(e: any) => {
                        if (e.target.value.replace(/\D/g, '').length !== 8) {
                          setCepFre('');
                        }
                      }} />
                    <FiIcons.FiSearch
                      color='#000'
                      style={{ cursor: 'pointer', width: '10%', height: '100%' }}
                      onClick={buscaCep}
                    />
                  </>
                  {fre && <strong>&nbsp;&nbsp;{formatCurrency(fre)}</strong>}
                </FreteInputDiv>
              </FreteDiv>
              <br />
              <hr />
            </>
          }
          <DescricaoProdutoDiv>
            {desSit.length > 0 && desSit.map((descricao: any, index: any) => (
              <Accordion key={index} titulo={descricao.titulo} texto={descricao.conteudo} />
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
              backgroundColor={api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ? '#000' : '#48DE55'}
              onClick={() => {
                if (api.defaults.baseURL === 'https://killar-api.herokuapp.com/api') {
                  ComprarPeloWhatsApp();
                  return;
                }

                const codmer = produtoDetalhes?.detalhes.filter((produto: any) =>
                  produto.tamanho == tamanhoSelecionado && (produto?.cor ? produto.cor === corSelecionada.padmer : true)
                );

                addProdutoNoCarrinho({
                  codmer: codmer[0]?.codigo ?? '', codbar: produtoDetalhes?.codBar, mer: produtoDetalhes?.mer, codtam: tamanhoSelecionado, cor: corSelecionada,
                  quantidade: String(Math.floor(+quantidade)), valor: codmer[0]?.valor ?? 0
                });
              }}
              disabled={Boolean(produtoDetalhes?.esgSit)}
            >
              {api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ? isMobile ? 'Comprar' : 'Adicionar ao Carrinho' : 'WhatsApp'}
              {api.defaults.baseURL !== 'https://killar-api.herokuapp.com/api' ?
                <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} /> :
                <AiIcons.AiOutlineWhatsApp style={{ marginLeft: 10 }} size={25} />
              }
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
