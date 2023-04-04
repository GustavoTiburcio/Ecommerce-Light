import React from 'react';
import Card from '../../components/Card';
import Copyright from '../../components/Copyright';
import Footer from '../../components/Footer';
import { Container, Banner, TitleDiv, ProdutosDiv, FiltrosDiv, CardsDiv } from './styles';

export default function ProdutoListagem() {

  const produtos = [
    { nome: 'Top Alto Giro hyper Costas Decotada', preço: '149,90', parcelamento: '6x R$ 24,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752537-900-900?v=1766576413&width=900&height=900&aspect=true' },
    { nome: 'Jaqueta Alto Giro Hyper Com Bolsos E Capuz', preço: '658,90', parcelamento: '6x R$ 109,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752130-900-900?v=638113083281100000&width=900&height=900&aspect=true' },
    { nome: 'Leggin Alto Giro Hyper Recortes E Bolsos', preço: '358,90', parcelamento: '6x R$ 59,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751823-900-900?v=1766575988&width=900&height=900&aspect=true' },
    { nome: 'Shorts Alto Giro Opaque Sobreposto', preço: '179,90', parcelamento: '6x R$ 29,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751773-900-900?v=1766575821&width=900&height=900&aspect=true' },
    { nome: 'Top Alto Giro Hyper Tule Costas E termo', preço: '258,90', parcelamento: '6x R$ 43,15 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751803-900-900?v=1766576823&width=900&height=900&aspect=true' },
    { nome: 'Top Alto Giro Versatily Dupla Face Roletes Costas', preço: '254,90', parcelamento: '6x R$ 42,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751764-900-900?v=1766351067&width=900&height=900&aspect=true' },
    { nome: 'Shorts Alto Giro Wind 3 Em 1', preço: '319,90', parcelamento: '6x R$ 53,31 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1755570-900-900?v=1766575986&width=900&height=900&aspect=true' },
    { nome: 'Leggin Alto Giro Hyper C/ Abert. Na Barra e Bolsa', preço: '278,90', parcelamento: '6x R$ 46,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752066-900-900?v=1766521159&width=900&height=900&aspect=true' },
  ];

  return (
    <Container>
      <Banner src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/b463a0cf-e1e3-4a9d-834a-714c38de43b4___ed11e381031b526d361b84ee82e8e02f.jpg' />
      <TitleDiv>
        <span>Home {'>'} Feminino {'>'} Fitness</span>
        <b>Fitness</b>
        <span>Ordenação</span>
      </TitleDiv>
      <ProdutosDiv>
        <FiltrosDiv>
          <span>
            Filtros
          </span>
        </FiltrosDiv>
        <CardsDiv>
          {produtos.map((produto) => {
            return (
              <>
                <Card
                  imageSrc={produto.imageSrc}
                  nome={produto.nome}
                  preço={produto.preço}
                  parcelamento={produto.parcelamento}
                />
              </>);
          })}
        </CardsDiv>
      </ProdutosDiv>
      <Footer />
      <Copyright />
    </Container>
  );
}
