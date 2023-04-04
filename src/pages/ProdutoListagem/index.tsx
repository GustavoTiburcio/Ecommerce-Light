import React, { useState, useEffect } from 'react';
import Accordion from '../../components/Accordion';
import Card from '../../components/Card';
import Copyright from '../../components/Copyright';
import Footer from '../../components/Footer';
import {
  Container, Banner, TitleDiv, ProdutosDiv,
  FiltrosDiv, CardsDiv, InputSlider, ActivityIndicator
} from './styles';
import Logo from '../../assets/images/header_logo.svg';


export default function ProdutoListagem() {
  const [produtos, setProdutos] = useState([
    // { nome: 'Top Alto Giro hyper Costas Decotada', preço: '149,90', parcelamento: '6x R$ 24,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752537-900-900?v=1766576413&width=900&height=900&aspect=true' },
    // { nome: 'Jaqueta Alto Giro Hyper Com Bolsos E Capuz', preço: '658,90', parcelamento: '6x R$ 109,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752130-900-900?v=638113083281100000&width=900&height=900&aspect=true' },
    // { nome: 'Leggin Alto Giro Hyper Recortes E Bolsos', preço: '358,90', parcelamento: '6x R$ 59,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751823-900-900?v=1766575988&width=900&height=900&aspect=true' },
    // { nome: 'Shorts Alto Giro Opaque Sobreposto', preço: '179,90', parcelamento: '6x R$ 29,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751773-900-900?v=1766575821&width=900&height=900&aspect=true' }
  ]);
  const [temMais, setTemMais] = useState(true);
  const [pagina, setPagina] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  function getProdutos(page: number) {
    setIsLoading(true);
    const newProdutos = [
      { nome: 'Top Alto Giro Hyper Tule Costas E termo', preço: '258,90', parcelamento: '6x R$ 43,15 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751803-900-900?v=1766576823&width=900&height=900&aspect=true' },
      { nome: 'Top Alto Giro Versatily Dupla Face Roletes Costas', preço: '254,90', parcelamento: '6x R$ 42,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751764-900-900?v=1766351067&width=900&height=900&aspect=true' },
      { nome: 'Shorts Alto Giro Wind 3 Em 1', preço: '319,90', parcelamento: '6x R$ 53,31 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1755570-900-900?v=1766575986&width=900&height=900&aspect=true' },
      { nome: 'Leggin Alto Giro Hyper C/ Abert. Na Barra e Bolsa', preço: '278,90', parcelamento: '6x R$ 46,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752066-900-900?v=1766521159&width=900&height=900&aspect=true' },
      { nome: 'Top Alto Giro Hyper Tule Costas E termo', preço: '258,90', parcelamento: '6x R$ 43,15 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751803-900-900?v=1766576823&width=900&height=900&aspect=true' },
      { nome: 'Top Alto Giro Versatily Dupla Face Roletes Costas', preço: '254,90', parcelamento: '6x R$ 42,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751764-900-900?v=1766351067&width=900&height=900&aspect=true' },
      { nome: 'Shorts Alto Giro Wind 3 Em 1', preço: '319,90', parcelamento: '6x R$ 53,31 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1755570-900-900?v=1766575986&width=900&height=900&aspect=true' },
      { nome: 'Leggin Alto Giro Hyper C/ Abert. Na Barra e Bolsa', preço: '278,90', parcelamento: '6x R$ 46,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752066-900-900?v=1766521159&width=900&height=900&aspect=true' }
    ];
    //setar state para falso quando acabar os produtos
    if (page === 100) {
      setTemMais(false);
    }

    setTimeout(() => {
      setProdutos([...produtos, ...newProdutos]);
      setIsLoading(false);
    }, 1000);
  }

  function onScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPagina(pagina + 1);
    }
  }

  useEffect(() => {
    getProdutos(pagina);
  }, [pagina]);

  //Busca mais produtos quando usuario scrolla até o final da página
  useEffect(() => {
    if (temMais) {
      console.log('passou');
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [produtos]);

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
          <Accordion titulo={'Cores'} conteudo={'Cores'} />
          <Accordion titulo={'Tamanho'} conteudo={'Tamanhos'} />
          <p>Faixa de preço</p>
          <InputSlider
            type="range" name="preço" min="0" max="50"
          />
        </FiltrosDiv>
        <CardsDiv>
          {produtos.map((produto: any, index) => {
            return (
              <React.Fragment key={index}>
                <Card
                  imageSrc={produto.imageSrc}
                  nome={produto.nome}
                  preço={produto.preço}
                  parcelamento={produto.parcelamento}
                />
              </React.Fragment>);
          })}
        </CardsDiv>
      </ProdutosDiv>
      {isLoading &&
        <ActivityIndicator src={Logo} alt='Logo' />
      }
      <Footer />
      <Copyright />
    </Container>
  );
}
