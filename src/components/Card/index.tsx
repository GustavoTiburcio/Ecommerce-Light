import React, { useState, useEffect, useContext } from 'react';
import { CardContainer, CardImage, TextDiv } from './styles';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';

interface CardProps {
  imageSrc: string;
  nome: string;
  codbar: string;
  preço: string | number;
  parcelamento?: string;
}

export default function Card({ imageSrc, nome, codbar, preço, parcelamento }: CardProps) {
  const navigate = useNavigate();
  const { configs }: any = useContext(Context);

  const [tipoCardImagem, setTipoCardImagem] = useState('');

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: tipoImagem }] = configs.filter((config: any) => config.con === 'ExiTipImg');

      setTipoCardImagem(tipoImagem.toLowerCase());
    }
  }, [configs]);

  return (
    <>
      <CardContainer onClick={() => navigate(`/produtoDetalhes/${codbar}`)} tipoCardImagem={tipoCardImagem}>
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
