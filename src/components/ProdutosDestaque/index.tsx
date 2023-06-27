import React, { useState, useEffect, useContext } from 'react';
import { CarouselContainer, Container } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../Card';
import useWindowDimensions from '../../utils/WindowDimensions';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Context from '../../context/Context';

interface ProdutoCardProps {
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: number;
  parcelamento?: string;
  esgSit?: boolean;
}

export default function ProdutosDestaque() {
  const { configs }: any = useContext(Context);
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [produtos, setProdutos] = useState<ProdutoCardProps[]>([]);
  const [tipoCardImagem, setTipoCardImagem] = useState('');

  async function getProdutosCardDestaque() {
    try {
      const response = await api.get('/mercador/listarProdutosCard?page=0&codtabpre=0&visdes=1&size=60');

      const newProdutos: ProdutoCardProps[] = response.data.content.map((produtos: any) => {
        return {
          linkFot: produtos.linkFot ? 'https://' + produtos.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
          mer: produtos.mer,
          codbar: produtos.codBar,
          valVenMin: produtos.valVenMin,
          esgSit: Boolean(produtos.esgSit)
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
              esgotado={produto.esgSit}
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
              esgotado={produto.esgSit}
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
        infiniteLoop={true}
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
