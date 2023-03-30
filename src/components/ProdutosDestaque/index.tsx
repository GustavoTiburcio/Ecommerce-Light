import React from 'react';
import { Card, Card2, CarouselContainer, Container } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ProdutosDestaque() {
  return (
    <Container>
      <p>Destaque</p>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
      // autoPlay
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </Carousel>
    </Container>
  );
}
