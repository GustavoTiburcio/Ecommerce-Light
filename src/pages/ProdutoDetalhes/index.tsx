import React from 'react';
import { Container, ImageCarouselDiv } from './styles';
import { Carousel } from 'react-responsive-carousel';

export default function ProdutoDetalhes() {
  return (
    <Container>
      <ImageCarouselDiv>
        teste
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          swipeable={true}
          emulateTouch={true}
        // infiniteLoop
        // autoPlay
        >
          <div style={{ height: '40rem', backgroundColor: 'red' }}>
            <img style={{ height: '100%', width: '100%' }} src='https://td0295.vtexassets.com/arquivos/ids/1752130/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-frontal-ano-2023---outono-2311902-c5540-1.jpg?v=638113083281100000' />
          </div>
          <div style={{ height: '40rem', backgroundColor: 'red' }}>
            {/* <img src='https://td0295.vtexassets.com/arquivos/ids/1752131/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-costa-ano-2023---outono-2311902-c5540-2.jpg?v=638113083283600000' /> */}
          </div>
          <div style={{ height: '40rem', backgroundColor: 'red' }}>
            {/* <img src='https://td0295.vtexassets.com/arquivos/ids/1756187/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-detalhe-ano-2023---outono-2311902-c5540-3.jpg?v=638157736649030000' /> */}
          </div>
          <div style={{ height: '40rem', backgroundColor: 'red' }}>
            {/* <img src='https://td0295.vtexassets.com/arquivos/ids/1756188/jaqueta-hyper-com-bolsos-e-capuz-p-azul-poseidon-detalhe-ano-2023---outono-2311902-c5540-4.jpg?v=638157736651400000' /> */}
          </div>
        </Carousel>
      </ImageCarouselDiv>
    </Container>
  );
}
