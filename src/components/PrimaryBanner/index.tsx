import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from './styles';
import useWindowDimensions from '../../utils/WindowDimensions';
import { toast } from 'react-toastify';
import api from '../../services/api';

export interface IPrimaryBanner {
  cod: number;
  linfot: string;
  ban?: string;
  tipban: 'P' | 'S';
  lin?: number;
  par?: string;
  ord?: number;
}

export default function PrimaryBanner() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [banners, setBanners] = useState<IPrimaryBanner[]>([]);

  async function getBanners() {
    try {
      const response = await api.get('/banner');
      if (response.status === 200) {
        const bannersFilter = response.data.filter((banner:IPrimaryBanner) => banner.tipban === 'P');
        setBanners(bannersFilter);
      }
    } catch (error: any) {
      toast.error('Failed to fetch banners. ' + error.message);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

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
        {banners.length > 0 && banners.map((banner: IPrimaryBanner, index: number) => (
          <div key={index}>
            <img
              src={'https://' + banner.linfot}
            />
          </div>
        ))}
      </Carousel>
    </Container>
  );
}
