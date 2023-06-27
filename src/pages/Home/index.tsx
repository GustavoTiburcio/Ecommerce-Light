import React, { useState, useEffect, useContext } from 'react';
import PrimaryBanner from '../../components/PrimaryBanner';
import BarInfo from '../../components/BarInfo';
import Newsletter from '../../components/Newsletter';
import ProductHighlights from '../../components/ProductHighlights';
import { Container, LogoRodape } from './styles';
import Footer from '../../components/Footer';
import Context from '../../context/Context';
import CustomBanners from '../../components/CustomBanners';

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
        <PrimaryBanner />
        <BarInfo />
        <CustomBanners />
        <ProductHighlights />
        <Newsletter />
        <LogoRodape src={logoURI} alt="Logo" />
        <Footer />
      </Container>
    </>
  );
}
