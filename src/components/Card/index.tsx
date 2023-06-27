import React, { useState, useEffect, useContext } from 'react';
import { CardContainer, CardImage, EsgotadoText, TextDiv } from './styles';
import { useLocation, useNavigate } from 'react-router';
import Context, { IContext } from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';

interface CardProps {
  imageSrc: string;
  nome: string;
  codbar: string;
  preço: number;
  esgotado?: boolean;
}

export default function Card({ imageSrc, nome, codbar, preço, esgotado }: CardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { configs, dadosLogin }: IContext = useContext(Context);

  const [tipoCardImagem, setTipoCardImagem] = useState('');
  const [quaMaxPar, setQuaMaxPar] = useState(1);
  const [valMinPar, setValMinPar] = useState(1);
  const [NecCadAutMosPro, setNecCadAutMosPro] = useState<boolean>(false);
  const [ApaCodBarCar, setApaCodBarCar] = useState<boolean>(false);

  function Preco() {
    if (NecCadAutMosPro) {
      if (!dadosLogin.autverprosit) {
        return <></>;
      }
    }
    return (
      <>
        <span>{formatCurrency(preço)}</span>
        {
          quaMaxPar > 0 && (preço / quaMaxPar) >= valMinPar ?
            <b>{quaMaxPar}x de {formatCurrency(preço / quaMaxPar)}</b> :
            <b>1x de {formatCurrency(preço)}</b>
        }
      </>
    );
  }

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: tipoImagem }] = configs.filter((config: any) => config.con === 'ExiTipImg');
      const [{ val: quaMaxPar }] = configs.filter((config: any) => config.con === 'quamaxpar');
      const [{ val: valminpar }] = configs.filter((config: any) => config.con === 'valminpar');
      const [{ val: CadAutMosPro }] = configs.filter((config: any) => config.con === 'NecCadAutMosPro');
      const [{ val: CodBarCar }] = configs.filter((config: any) => config.con === 'ApaCodBarCar');

      setTipoCardImagem(tipoImagem.toLowerCase());
      setQuaMaxPar(quaMaxPar);
      setValMinPar(valminpar);
      setNecCadAutMosPro(Boolean(+CadAutMosPro));
      setApaCodBarCar(Boolean(+CodBarCar));
    }
  }, [configs]);

  return (
    <>
      <CardContainer
        tipoCardImagem={tipoCardImagem}
        onClick={() => navigate(`/produtoDetalhes/${codbar}/${nome.replaceAll(' ', '-')}`, { state: { caminho: location.state?.caminho } })}
      >
        <CardImage src={imageSrc} />
        <TextDiv>
          {(ApaCodBarCar || NecCadAutMosPro) && <span>{codbar}</span>}
          <span className='nomeProduto'>{nome}</span>
          <Preco />
          {esgotado &&
            <EsgotadoText>
              Esgotado
            </EsgotadoText>
          }
        </TextDiv>
      </CardContainer >
    </>
  );
}
