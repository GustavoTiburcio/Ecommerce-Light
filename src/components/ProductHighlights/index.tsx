import React, { useState, useEffect, useContext } from 'react';
import { CarouselContainer, Container } from './styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../Card';
import useWindowDimensions from '../../utils/WindowDimensions';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Context, { IConfigs, IContext } from '../../context/Context';

interface ProductCardProps {
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: number;
  parcelamento?: string;
  esgSit?: boolean;
}

export default function ProductHighlights() {
  const { configs }: IContext = useContext(Context);
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [imageOrientation, setImageOrientation] = useState('');

  async function getProductsHighlights() {
    try {
      const response = await api.get('/mercador/listarProdutosCard?page=0&codtabpre=0&visdes=1&size=60');

      const newProdutos: ProductCardProps[] = response.data.content.map((produtos: any) => {
        return {
          linkFot: produtos.linkFot ? 'https://' + produtos.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
          mer: produtos.mer,
          codbar: produtos.codBar,
          valVenMin: produtos.valVenMin,
          esgSit: Boolean(produtos.esgSit)
        };
      });

      setProducts(newProdutos);

    } catch (error: any) {
      toast.error('Failed to fetch product highlights. ' + error.message);
    }
  }

  const imageCarousel = products.map((produto, i) => {
    if (i % (imageOrientation === 'paisagem' && width < 1600 ? 3 : 4) === 0) {
      return (
        <CarouselContainer key={i} className='carousel'>
          {products.map((produto, index) => index >= i && index <= i + (imageOrientation === 'paisagem' && width < 1600 ? 2 : 3) &&
            <Card
              key={index}
              imageSrc={produto.linkFot}
              name={produto.mer}
              sku={produto.codbar}
              price={produto.valVenMin}
              soldOut={produto.esgSit}
            />
          )}
        </CarouselContainer>);
    } else {
      return '';
    }
  });

  const imageCarouselMobile = products.map((produto, i) => {
    if (i % (width <= 767 ? 2 : 3) === 0) {
      return (
        <CarouselContainer key={i} className='carousel'>
          {products.map((produto, index) => index >= i && index <= i + (width <= 767 ? 1 : 2) &&
            <Card
              key={index}
              imageSrc={produto.linkFot}
              name={produto.mer}
              sku={produto.codbar}
              price={produto.valVenMin}
              soldOut={produto.esgSit}
            />
          )}
        </CarouselContainer>);
    } else {
      return '';
    }
  });


  const filteredCarousel = imageCarousel.filter(teste => teste);
  const filteredCarouselMobile = imageCarouselMobile.filter(teste => teste);

  useEffect(() => {
    getProductsHighlights();
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: tipoImagem }] = configs.filter((config: IConfigs) => config.config === 'imageOrientation');

      setImageOrientation(tipoImagem.toLowerCase());
    }
  }, [configs]);

  return (
    <Container tipoCardImagem={imageOrientation}>
      <p>Highlights</p>
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
          filteredCarouselMobile.length > 0 && filteredCarouselMobile.map(novo => novo)
          : filteredCarousel.length > 0 && filteredCarousel.map(novo => novo)
        }
      </Carousel>
    </Container>
  );
}
