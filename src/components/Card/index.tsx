import React from 'react';
import { CardContainer, CardImage, TextDiv } from './styles';
import { useNavigate } from 'react-router';

interface CardProps {
  imageSrc: string;
  nome: string;
  codbar: string;
  preço: string | number;
  parcelamento?: string;
}

export default function Card({ imageSrc, nome, codbar, preço, parcelamento }: CardProps) {
  const navigate = useNavigate();

  return (
    <>
      <CardContainer onClick={() => navigate('/produtoDetalhes', { state: { codbar: codbar} })}>
        <CardImage src={imageSrc} />
        <TextDiv>
          <span className='nomeProduto'>{nome}</span>
          <span>{preço}</span>
          <b>{parcelamento}</b>
        </TextDiv>
      </CardContainer>
    </>
  );
}
