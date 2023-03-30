import React from 'react';
import { CardContainer, CardImage, TextDiv } from './styles';

interface CardProps {
  imageSrc: string;
  nome: string;
  preço: string | number;
  parcelamento?: string;
}

export default function Card({ imageSrc, nome, preço, parcelamento }: CardProps) {
  return (
    <>
      <CardContainer>
        <CardImage src={imageSrc} />
        <TextDiv>
          <span>{nome}</span>
          <span>R$ {preço}</span>
          <b>{parcelamento}</b>
        </TextDiv>
      </CardContainer>
    </>
  );
}
