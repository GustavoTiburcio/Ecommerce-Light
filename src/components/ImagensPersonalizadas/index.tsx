import React from 'react';
import { Container, Image, ImageDiv } from './styles';

interface ImagensPeronsalizadasProps {
  imagensSrc: string[];
  hoverZoom? : boolean;
}

export default function ImagensPersonalizadas({ imagensSrc, hoverZoom }: ImagensPeronsalizadasProps) {
  return (
    <Container>
      {imagensSrc.map((imagemSrc, index) =>
        <ImageDiv key={index} hoverZoom={hoverZoom}>
          <Image src={imagemSrc} />
        </ImageDiv>
      )}
    </Container>
  );
}
