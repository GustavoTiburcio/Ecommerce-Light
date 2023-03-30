import React, { useState } from 'react';
import Banner from '../../components/Banner';
import BannerCarousel from '../../components/BannerCarousel';
import ImagensPersonalizadas from '../../components/ImagensPersonalizadas';
import InfoBar from '../../components/InfoBar';
import Loader from '../../components/Loader';
import ProdutosDestaque from '../../components/ProdutosDestaque';
import Sections from '../../components/Sections';
import { Container } from './styles';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <>
      {!isLoading ?
        <Container>
          <BannerCarousel />
          <InfoBar />
          <Sections />
          <Banner />
          <ImagensPersonalizadas />
          <ProdutosDestaque />
        </Container>
        :
        <Loader />
      }
    </>
  );
}
