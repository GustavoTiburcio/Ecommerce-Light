import React, { useState } from 'react';
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
import Copyright from '../../components/Copyright';
import Footer from '../../components/Footer';
import * as FiIcons from 'react-icons/fi';
import Accordion from '../../components/Accordion';
import Cores from '../../components/Cores/Index';
import Tamanhos from '../../components/Tamanhos';

export default function ProdutoDetalhes() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const acordionContent = [
    { title: 'Descrição', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
    { title: 'Composição', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
    { title: 'Troca e Devolução', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
  ];

  const [quantidade, setQuantidade] = useState('1');
  const [corSelecionada, setCorSelecionada] = useState();
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState();

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
          >
            <ImageCarouselContainer>
              <img
                style={{ height: '100%', width: '80%', objectFit: 'cover' }}
                src='https://td0295.vtexassets.com/arquivos/ids/1762495-1600-auto?v=638159793932930000&width=1600&height=auto&aspect=true'
              />
            </ImageCarouselContainer>
            <ImageCarouselContainer>
              <img
                style={{ height: '100%', width: '80%', objectFit: 'cover' }}
                src='https://td0295.vtexassets.com/arquivos/ids/1762496-1600-auto?v=638159793934800000&width=1600&height=auto&aspect=true'
              />
            </ImageCarouselContainer>
            <ImageCarouselContainer>
              <img
                style={{ height: '100%', width: '80%', objectFit: 'cover' }}
                src='https://td0295.vtexassets.com/arquivos/ids/1762497-1600-auto?v=638159793937300000&width=1600&height=auto&aspect=true'
              />
            </ImageCarouselContainer>
            <ImageCarouselContainer>
              <img
                style={{ height: '100%', width: '80%', objectFit: 'cover' }}
                src='https://td0295.vtexassets.com/arquivos/ids/1762498-1600-auto?v=638159793939670000&width=1600&height=auto&aspect=true'
              />
            </ImageCarouselContainer>
          </Carousel>
        </ImageCarouselDiv>
        <ProdutoInfoDiv>
          <NavDiv>
            <Button>
              Favoritar
              <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDiv>
          <hr />
          <Titulo>
            Jaqueta Alto Giro Hyper Com Bolsos E Capuz
          </Titulo>
          <Ref>
            Ref: 2311902
          </Ref>
          <PrecoDiv>
            <b>
              R$ 658,90
            </b>
            <span>
              6x R$ 109,81
            </span>
          </PrecoDiv>
          <CorTamanhoDiv>
            <CoresDiv>
              <span>Cor</span>
              <PaletaCoresDiv>
                <Cores setCorSelecionada={setCorSelecionada} />
              </PaletaCoresDiv>
            </CoresDiv>
            <TamanhosDiv>
              <span>Tamanho</span>
              <PaletaTamanhosDiv>
                <Tamanhos setTamanhoSelecionado={setTamanhoSelecionado} />
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
                onClick={() => {
                  if (quantidade === '1') {
                    return;
                  }
                  setQuantidade(prev => {
                    return String(+prev - 1);
                  });
                }}
              >
                -
              </QuantidadeButton>
              <QuantidadeInput
                type={'number'}
                value={quantidade}
                onChange={(e) => {
                  if (+e.target.value >= 0) {
                    setQuantidade(e.target.value!);
                  }
                }}
              />
              <QuantidadeButton
                onClick={() => {
                  setQuantidade(prev => {
                    return String(+prev + 1);
                  });
                }}>
                +
              </QuantidadeButton>
            </QuantidadeInputDiv>
            <Button
              backgroundColor='#000'
            >
              Adicionar ao Carrinho
              <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDivCarrinho>
          <hr />
          <DescricaoProdutoDiv>
            {acordionContent.map((content: any, index: any) => (
              <Accordion key={index} titulo={content.title} conteudo={content.content} />
            ))}
          </DescricaoProdutoDiv>
          <hr />
          <ProdutoReviewDiv>
            <NotaProdutoDiv>
              <span><b>-/5</b></span>
              <span>NOTA DO PRODUTO</span>
              <StarDiv>
                {/* <AiIcons.AiFillStar color='yellow' /> */}
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
      <Copyright />
    </Container>
  );
}
