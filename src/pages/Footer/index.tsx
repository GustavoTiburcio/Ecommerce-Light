import React, { useContext } from 'react';
import { Container, DetailsView } from './styles';
import { useParams } from 'react-router-dom';
import Context, { IContext, IFooterItens, IFooterSubItens, IFooter } from '../../context/Context';

export default function Footer() {
  const { footerItem } = useParams();
  const { footer }: IContext = useContext(Context);
  let perResIteRod: IFooterSubItens[] = [];

  const itemRodapeFiltrado = footer.map((rodape: IFooter) => rodape.iterod.filter((rod: IFooterItens) => rod.iterod === footerItem)).filter((itemrodape: any) => {
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
      <h1>{perResIteRod.length > 0 ? footerItem : 'Footer Item not found'}</h1>
      {perResIteRod.map((perResIteRod: IFooterSubItens, index: number) => (
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
