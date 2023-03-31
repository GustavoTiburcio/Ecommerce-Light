import React, { useState } from 'react';
import Banner from '../../components/Banner';
import BannerCarousel from '../../components/BannerCarousel';
import EmpresaInfo from '../../components/EmpresaInfo';
import ImagensPersonalizadas from '../../components/ImagensPersonalizadas';
import InfoBar from '../../components/InfoBar';
import Loader from '../../components/Loader';
import Newsletter from '../../components/Newsletter';
import ProdutosDestaque from '../../components/ProdutosDestaque';
import Sections from '../../components/Sections';
import { Container, LogoRodape } from './styles';
import LogoSVG from '../../assets/images/header_logo.svg';
import Footer from '../../components/Footer';
import Copyright from '../../components/Copyright';

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
          <ImagensPersonalizadas
            imagensSrc={['https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/8aae9a93-9b5d-482b-9158-f842e6747de6___f222a89ed8eec52a1bbfa5eacaaf4981.jpg', 'https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/53e77470-82a3-48e8-b15b-6f2a683b6d59___61cc08e1ad05437a51fff80856e02e23.jpg']}
            hoverZoom
          />
          <ProdutosDestaque />
          <ImagensPersonalizadas
            imagensSrc={['https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/796fc664-6db6-4ecd-8b6f-0afab65ec779___ebe784c5ce3e0231bcfc52507c2aa5fc.jpg', 'https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/df7dff86-6158-4e21-96d4-1ff0a6c532e6___cd5be61f78f7422d535f17ce05623313.jpg']}
          />
          <EmpresaInfo />
          <Newsletter />
          <LogoRodape src={LogoSVG} alt="Logo" />
          <Footer />
          <Copyright />
        </Container>
        :
        <Loader />
      }
    </>
  );
}