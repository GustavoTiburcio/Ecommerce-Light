import React, { useState, useEffect, useContext } from 'react';
import BannerPrimario from '../../components/BannerPrimario';
import BarInfo from '../../components/BarInfo';
import Newsletter from '../../components/Newsletter';
import ProdutosDestaque from '../../components/ProdutosDestaque';
import { Container, LogoRodape } from './styles';
import Footer from '../../components/Footer';
import Context from '../../context/Context';
import BannersPersonalizados from '../../components/BannersPersonalizados';

export default function Home() {
  const { configs }: any = useContext(Context);

  //configs
  const [logoURI, setLogoURI] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  return (
    <>
      <Container>
        <BannerPrimario />
        <BarInfo />
        <BannersPersonalizados />
        <ProdutosDestaque />
        <Newsletter />
        <LogoRodape src={logoURI} alt="Logo" />
        <Footer />
      </Container>
    </>
  );
}
