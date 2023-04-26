import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import { NotaProdutoDiv, Container, RecomendacaoDiv, StarDiv } from './styles';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface AvaliacaoProdutoProps {
  codbar: string | undefined;
}

export default function AvaliacaoProduto({ codbar }: AvaliacaoProdutoProps) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [notaMedia, setNotaMedia] = useState(0);

  async function getAvaliacaoProduto(codbar: string | undefined) {
    if (!codbar) {
      throw Error('Codbar não foi informado');
    }

    try {
      const response = await api.get(`/avaliacoes/listarPorCodbar?codbar=${codbar}`);

      if (response.status === 200) {

        const media = response.data.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue?.pon,
          0
        ) / response.data.length;

        setNotaMedia(media);

        setAvaliacoes(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao obter avaliações do produtos. ' + error.message);
    }
  }

  function Estrelas() {
    const Estrelas = [];

    for (let index = 0; index < 5; index++) {
      if (index < Math.floor(notaMedia)) {
        Estrelas.push(<AiIcons.AiFillStar color='yellow' style={{ stroke: 'black', strokeWidth: 20 }} key={index} />);
      } else {
        Estrelas.push(<AiIcons.AiOutlineStar key={index} />);
      }
    }
    return <>{Estrelas}</>;
  }

  useEffect(() => {
    getAvaliacaoProduto(codbar);
  }, []);

  return (
    <Container>
      <NotaProdutoDiv>
        <span><b>{!notaMedia ? '-' : notaMedia}</b>/5</span>
        <span>NOTA DO PRODUTO</span>
        <StarDiv>

          <Estrelas />

        </StarDiv>
        <p>Baseado em {avaliacoes.length} avaliações</p>
      </NotaProdutoDiv>
      <RecomendacaoDiv>
        {avaliacoes.length > 0 ?
          avaliacoes.map((avaliacao: any, index: number) => (
            <span key={index} title={avaliacao.det}>&ldquo;{avaliacao.det}&ldquo;</span>
          ))
          :
          <span>Nenhuma avaliação foi informada</span>
        }
      </RecomendacaoDiv>
    </Container>
  );
}
