import React, { useContext } from 'react';
import { Container, DetailsView } from './styles';
import { useParams } from 'react-router-dom';
import Context, { IContext, IFooterItens, IFooterSubItens, IFooter } from '../../context/Context';

export default function Footer() {
  const { footerItem } = useParams();
  const { footer }: IContext = useContext(Context);
  let perResIteRod: IFooterSubItens[] = [];

  const filteredFooterItem = footer.map((foot: IFooter) => foot.footerItens.filter((footItem: IFooterItens) => footItem.text === footerItem)).filter((itemrodape: any) => {
    if (itemrodape.length > 0) {
      return itemrodape;
    }
  });


  if (filteredFooterItem.length > 0) {
    const [[iteFoot]] = filteredFooterItem;
    perResIteRod = iteFoot.footerSubItens;
  }

  return (
    <Container>
      <h1>{perResIteRod.length > 0 ? footerItem : 'Footer Item not found'}</h1>
      {perResIteRod.map((perResIteRod: IFooterSubItens, index: number) => (
        <DetailsView key={index}>
          {(perResIteRod.question && perResIteRod.answer) ?
            <details>
              <summary>{perResIteRod.question}</summary>
              <p>{perResIteRod.answer}</p>
            </details> :
            <>
              <b>{perResIteRod.question}</b>
              <p>{perResIteRod.answer}</p>
            </>
          }
        </DetailsView>
      ))}
    </Container>
  );
}
