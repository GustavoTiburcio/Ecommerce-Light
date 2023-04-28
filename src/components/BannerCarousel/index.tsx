import React, { useEffect, useState, useContext } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from './styles';
import useWindowDimensions from '../../utils/WindowDimensions';
import Context from '../../context/Context';

function BannerCarousel() {
  const { configs }: any = useContext(Context);
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (configs.length > 0) {
      const bannersFiltrados = configs.filter((config: any) => config.gru === 'baner');
      setBanners(bannersFiltrados);
    }
  }, [configs]);

  return (
    <Container>
      <Carousel
        showArrows={!isMobile}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        showIndicators={!isMobile}
        emulateTouch={true}
        infiniteLoop
        autoPlay
      >
        {banners.length > 0 && banners.map((banner, index) => (
          <div key={index}>
            <img src={'https://' + banner.val} />
          </div>
        ))}
      </Carousel>
    </Container>
  );
}

export default BannerCarousel;
