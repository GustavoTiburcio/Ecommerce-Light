import React, { useContext } from 'react';
import { Container, DetailsView } from './styles';
import { useParams } from 'react-router-dom';
import Context, { IContext, IItensRodape, IPerguntasRespostasItensRodape, IRodape } from '../../context/Context';

export default function Rodape() {
  const { iterod } = useParams();
  const { rodape }: IContext = useContext(Context);
  let perResIteRod: IPerguntasRespostasItensRodape[] = [];

  const itemRodapeFiltrado = rodape.map((rodape: IRodape) => rodape.iterod.filter((rod: IItensRodape) => rod.iterod === iterod)).filter((itemrodape: any) => {
    if (itemrodape.length > 0) {
      return itemrodape;
    }
  });


  if (itemRodapeFiltrado.length > 0) {
    const [[itemRodape]] = itemRodapeFiltrado;
    perResIteRod = itemRodape.perresiterod;
  }

  return (
    <Container>
      <h1>{perResIteRod.length > 0 ? iterod : 'Item rodapé não encontrado'}</h1>
      {perResIteRod.map((perResIteRod: IPerguntasRespostasItensRodape, index: number) => (
        <DetailsView key={index}>
          {(perResIteRod.per && perResIteRod.res) ?
            <details>
              <summary>{perResIteRod.per}</summary>
              <p>{perResIteRod.res}</p>
            </details> :
            <>
              <b>{perResIteRod.per}</b>
              <p>{perResIteRod.res}</p>
            </>
          }
        </DetailsView>
      ))}
    </Container>
  );
}
