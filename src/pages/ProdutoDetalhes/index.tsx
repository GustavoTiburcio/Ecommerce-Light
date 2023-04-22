import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Container, CoresDiv, CorTamanhoDiv, DescricaoProdutoDiv,
  DetalhesDiv, FreteDiv, FreteInput, FreteInputDiv, ImageCarouselContainer,
  ImageCarouselDiv, NavDiv, NavDivCarrinho, NotaProdutoDiv, PaletaCoresDiv,
  PaletaTamanhosDiv, PrecoDiv, ProdutoInfoDiv, ProdutoReviewDiv,
  QuantidadeButton, QuantidadeInput, QuantidadeInputDiv, RecomendacaoDiv,
  Ref, StarDiv, TamanhosDiv, Titulo
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
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/Context';

interface ProdutoCarrinhoProps {
  cod: string | number;
  mer: string;
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
  const { codbar } = useParams();

  const { carrinho, setCarrinho }: any = useContext(Context);

  const [quantidade, setQuantidade] = useState<string>('1');
  const [corSelecionada, setCorSelecionada] = useState<CorSelecionadaProps>({ cod: '', padmer: '', linkFot: '' });
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('');
  const [fotos, setFotos] = useState<any>([]);
  const [produtoDetalhes, setProdutoDetalhes] = useState<any>([]);
  const [desSit, setDesSit] = useState<any>([]);

  const [tamanhos, setTamanhos] = useState<any>([]);
  const [cores, setCores] = useState<any>([]);
  const [indexCarousel, setIndexCarousel] = useState<number>(0);

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
      }

    } catch (error: any) {
      toast.error('Falha ao buscar detalhes do produto ' + error.message);
    }
  }

  function decrementarQuantidade() {
    if (quantidade === '1') {
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
      setQuantidade(e.target.value!);
    }
  }

  function addProdutoNoCarrinho({ cod, mer, codTam, cor, quantidade, valor }: ProdutoCarrinhoProps) {
    const novoProduto = [{ cod, mer, codTam, cor, quantidade, valor }];

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

    setCarrinho([...carrinho, ...novoProduto]);
    toast.success(
      `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codTam ? '- ' + codTam.toUpperCase() : ''} Foi adicionado ao carrinho`
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
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
            <span>Home {'>'} Feminino {'>'} Fitness</span>
            <Button>
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
            <span>
              {produtoDetalhes?.quaParValMax && produtoDetalhes?.quaParValMax + ' x '}
              {produtoDetalhes?.valVenMin && produtoDetalhes?.quaParValMax && formatCurrency(produtoDetalhes?.valVenMin / produtoDetalhes?.quaParValMax)}
            </span>
          </PrecoDiv>
          <CorTamanhoDiv>
            <CoresDiv>
              <span>Cor</span>
              <PaletaCoresDiv>
                <Cores setCorSelecionada={setCorSelecionada} coresLista={cores} />
              </PaletaCoresDiv>
            </CoresDiv>
            <TamanhosDiv>
              <span>Tamanho</span>
              <PaletaTamanhosDiv>
                <Tamanhos setTamanhoSelecionado={setTamanhoSelecionado} tamanhosLista={tamanhos} />
              </PaletaTamanhosDiv>
            </TamanhosDiv>
          </CorTamanhoDiv>
          <hr />
          <NavDivCarrinho>
            <FreteDiv>
              <span>
                CALCULE O FRETE E PRAZO DE ENTREGA
              </span>
              <FreteInputDiv>
                <FreteInput placeholder='CEP' />
                <FiIcons.FiSearch color='#000' style={{ cursor: 'pointer', width: '10%', height: '100%' }} />
              </FreteInputDiv>
            </FreteDiv>
            <QuantidadeInputDiv>
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
                  cod: codmer[0]?.codigo ?? '', mer: produtoDetalhes?.mer, codTam: tamanhoSelecionado, cor: corSelecionada,
                  quantidade: quantidade, valor: codmer[0]?.valor ?? 0
                });
              }}
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
          <ProdutoReviewDiv>
            <NotaProdutoDiv>
              <span><b>-/5</b></span>
              <span>NOTA DO PRODUTO</span>
              <StarDiv>
                {/* <AiIcons.AiFillStar color='yellow' style={{ stroke: 'black', strokeWidth: 20}}/> */}
                <AiIcons.AiOutlineStar />
                <AiIcons.AiOutlineStar />
                <AiIcons.AiOutlineStar />
                <AiIcons.AiOutlineStar />
                <AiIcons.AiOutlineStar />
              </StarDiv>
              <p>Baseado em 0 avaliações</p>
            </NotaProdutoDiv>
            <RecomendacaoDiv>
              Nenhuma avaliação foi informada
            </RecomendacaoDiv>
          </ProdutoReviewDiv>
        </ProdutoInfoDiv>
      </DetalhesDiv>
      <Footer />
    </Container>
  );
}
