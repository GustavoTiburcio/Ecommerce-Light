import React, { useState, useEffect, useContext } from 'react';
import PrimaryBanner from '../../components/PrimaryBanner';
import InfoBar from '../../components/InfoBar';
import Newsletter from '../../components/Newsletter';
import ProductHighlights from '../../components/ProductHighlights';
import { Container, LogoRodape } from './styles';
import Footer from '../../components/Footer';
import Context, { IConfigs, IContext } from '../../context/Context';
import CustomBanners from '../../components/CustomBanners';

export default function Home() {
  const { configs }: IContext = useContext(Context);

  //configs
  const [logoURI, setLogoURI] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: uri }] = configs.filter((config: IConfigs) => config.config === 'logo');
      setLogoURI(uri);
    }
  }, [configs]);

  return (
    <>
      <Container>
        <PrimaryBanner />
        <InfoBar />
        <CustomBanners />
        <ProductHighlights />
        <Newsletter />
        <LogoRodape src={logoURI} alt="Logo" />
        <Footer />
      </Container>
    </>
  );
}
