import React, { useState } from 'react';
import {
  Button, Container, Cor, CoresDiv,
  CorTamanhoDiv, DescricaoProdutoDiv, DetalhesDiv, FreteDiv, FreteInput, FreteInputDiv, ImageCarouselDiv, NavDiv,
  NavDivCarrinho,
  NotaProdutoDiv,
  PaletaCoresDiv,
  PaletaTamanhosDiv,
  PrecoDiv, ProdutoInfoDiv, ProdutoReviewDiv, QuantidadeButton, QuantidadeInput, QuantidadeInputDiv, RecomendacaoDiv, Ref, StarDiv, Tamanho, TamanhosDiv, Titulo
} from './styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import * as AiIcons from 'react-icons/ai';
import Copyright from '../../components/Copyright';
import Footer from '../../components/Footer';
import * as FiIcons from 'react-icons/fi';
import Accordion from '../../components/Accordion';

export default function ProdutoDetalhes() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const [quantidade, setQuantidade] = useState('1');

  const acordionContent = [
    { title: 'Descrição', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
    { title: 'Composição', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
    { title: 'Troca e Devolução', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q.' },
  ];

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
            <div style={{ height: '45rem' }}>
              <img style={{ height: '100%', width: '80%' }} src='https://td0295.vtexassets.com/arquivos/ids/1752130/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-frontal-ano-2023---outono-2311902-c5540-1.jpg?v=638113083281100000' />
            </div>
            <div style={{ height: '45rem' }}>
              <img style={{ height: '100%', width: '80%' }} src='https://td0295.vtexassets.com/arquivos/ids/1752131/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-costa-ano-2023---outono-2311902-c5540-2.jpg?v=638113083283600000' />
            </div>
            <div style={{ height: '45rem' }}>
              <img style={{ height: '100%', width: '80%' }} src='https://td0295.vtexassets.com/arquivos/ids/1752130/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-frontal-ano-2023---outono-2311902-c5540-1.jpg?v=638113083281100000' />
            </div>
            <div style={{ height: '45rem' }}>
              <img style={{ height: '100%', width: '80%' }} src='https://td0295.vtexassets.com/arquivos/ids/1752131/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-costa-ano-2023---outono-2311902-c5540-2.jpg?v=638113083283600000' />
            </div>
          </Carousel>
        </ImageCarouselDiv>
        <ProdutoInfoDiv>
          <NavDiv>
            <Button>
              Marcar como favorito
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
                <Cor />
                <Cor />
                <Cor />
              </PaletaCoresDiv>
            </CoresDiv>
            <TamanhosDiv>
              <span>Tamanho</span>
              <PaletaTamanhosDiv>
                <Tamanho>
                  P
                </Tamanho>
                <Tamanho>
                  M
                </Tamanho>
                <Tamanho>
                  G
                </Tamanho>
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
                  if (quantidade === '0') {
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
                onChange={(e) => setQuantidade(e.target.value!)}
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
