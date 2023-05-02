import React, { useState, useEffect, useContext } from 'react';
import { CarouselContainer, Container } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../Card';
import useWindowDimensions from '../../utils/WindowDimensions';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import Context from '../../context/Context';

interface ProdutoCardProps {
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: string | number;
  parcelamento?: string;
}

export default function ProdutosDestaque() {
  const { configs }: any = useContext(Context);
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [produtos, setProdutos] = useState<ProdutoCardProps[]>([
    // { nome: 'Top Alto Giro hyper Costas Decotada', preço: '149,90', parcelamento: '6x R$ 24,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752537-900-900?v=1766576413&width=900&height=900&aspect=true' },
    // { nome: 'Jaqueta Alto Giro Hyper Com Bolsos E Capuz', preço: '658,90', parcelamento: '6x R$ 109,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752130-900-900?v=638113083281100000&width=900&height=900&aspect=true' },
    // { nome: 'Leggin Alto Giro Hyper Recortes E Bolsos', preço: '358,90', parcelamento: '6x R$ 59,81 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751823-900-900?v=1766575988&width=900&height=900&aspect=true' },
    // { nome: 'Shorts Alto Giro Opaque Sobreposto', preço: '179,90', parcelamento: '6x R$ 29,98 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751773-900-900?v=1766575821&width=900&height=900&aspect=true' },
    // { nome: 'Top Alto Giro Hyper Tule Costas E termo', preço: '258,90', parcelamento: '6x R$ 43,15 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751803-900-900?v=1766576823&width=900&height=900&aspect=true' },
    // { nome: 'Top Alto Giro Versatily Dupla Face Roletes Costas', preço: '254,90', parcelamento: '6x R$ 42,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1751764-900-900?v=1766351067&width=900&height=900&aspect=true' },
    // { nome: 'Shorts Alto Giro Wind 3 Em 1', preço: '319,90', parcelamento: '6x R$ 53,31 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1755570-900-900?v=1766575986&width=900&height=900&aspect=true' },
    // { nome: 'Leggin Alto Giro Hyper C/ Abert. Na Barra e Bolsa', preço: '278,90', parcelamento: '6x R$ 46,48 sem juros', imageSrc: 'https://td0295.vtexassets.com/arquivos/ids/1752066-900-900?v=1766521159&width=900&height=900&aspect=true' },
  ]);
  const [tipoCardImagem, setTipoCardImagem] = useState('');

  async function getProdutosCardDestaque() {
    try {
      const response = await api.get('/mercador/listarProdutosCard?page=0&CODTABPRE=0&VISDES=1&size=60');

      const newProdutos: ProdutoCardProps[] = response.data.content.map((produtos: any) => {
        return {
          linkFot: produtos.linkFot ? 'https://' + produtos.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
          mer: produtos.mer,
          codbar: produtos.codBar,
          valVenMin: formatCurrency(produtos.valVenMin),
          parcelamento: `3x de ${formatCurrency(produtos.valVenMin / 3)}`
        };
      });

      setProdutos(newProdutos);

    } catch (error: any) {
      toast.error('Falha ao buscar destaques. ' + error.message);
    }
  }

  const carretelImagens = produtos.map((produto, i) => {
    if (i % (tipoCardImagem === 'paisagem' && width < 1600 ? 3 : 4) === 0) {
      return (
        <CarouselContainer key={i} className='carousel'>
          {produtos.map((produto, index) => index >= i && index <= i + (tipoCardImagem === 'paisagem' && width < 1600 ? 2 : 3) &&
            <Card
              key={index}
              imageSrc={produto.linkFot}
              nome={produto.mer}
              codbar={produto.codbar}
              preço={produto.valVenMin}
              parcelamento={produto.parcelamento}
            />
          )}
        </CarouselContainer>);
    } else {
      return '';
    }
  });

  const carretelImagensMobile = produtos.map((produto, i) => {
    if (i % (width <= 767 ? 2 : 3) === 0) {
      return (
        <CarouselContainer key={i} className='carousel'>
          {produtos.map((produto, index) => index >= i && index <= i + (width <= 767 ? 1 : 2) &&
            <Card
              key={index}
              imageSrc={produto.linkFot}
              nome={produto.mer}
              codbar={produto.codbar}
              preço={produto.valVenMin}
              parcelamento={produto.parcelamento}
            />
          )}
        </CarouselContainer>);
    } else {
      return '';
    }
  });


  const carretelFiltrado = carretelImagens.filter(teste => teste);
  const carretelFiltradoMobile = carretelImagensMobile.filter(teste => teste);

  useEffect(() => {
    getProdutosCardDestaque();
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: tipoImagem }] = configs.filter((config: any) => config.con === 'ExiTipImg');

      setTipoCardImagem(tipoImagem.toLowerCase());
    }
  }, [configs]);

  return (
    <Container tipoCardImagem={tipoCardImagem}>
      <p>Nossos Destaques</p>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        emulateTouch={true}
        infiniteLoop={false}
        showIndicators={true}
        interval={5000}
        autoPlay
      >
        {isMobile ?
          carretelFiltradoMobile.length > 0 && carretelFiltradoMobile.map(novo => novo)
          : carretelFiltrado.length > 0 && carretelFiltrado.map(novo => novo)
        }
      </Carousel>
    </Container>
  );
}
