import React, { useState, useEffect } from 'react';
import { Container, IconDiv, IconDivMobile, InfoCard, MobileDiv } from './styles';
import useWindowDimensions from '../../utils/WindowDimensions';
import { Carousel } from 'react-responsive-carousel';
import IconeDinamico from '../IconeDinamico';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface BarInf {
  cod: number;
  barinf: string;
  nomico?: string;
  ord: number;
}

export default function BarInfo() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [barInf, setBarInf] = useState<BarInf[]>([]);

  async function getBarraDeInformações() {
    try {
      const response = await api.get('/barinf');
      if (response.status === 200 && response.data.length > 0) {
        setBarInf(response.data.sort((a: BarInf, b: BarInf) => a.ord - b.ord));
      }
    } catch (error: any) {
      toast.error('Falha ao buscar barra de informações');
    }
  }

  useEffect(() => {
    getBarraDeInformações();
  }, []);

  return (
    <Container>
      {isMobile ?
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          swipeable={false}
          emulateTouch={true}
          showIndicators={false}
          infiniteLoop
          autoPlay={true}
          className='carousel'
        >
          {barInf.length > 0 && barInf.map((barInf: BarInf, index: number) =>
            <MobileDiv key={index}>
              <IconDivMobile>
                <IconeDinamico nome={barInf.nomico} size={30} />
              </IconDivMobile>
              <span>
                {barInf.barinf}
              </span>
            </MobileDiv>
          )}
        </Carousel> :
        <>
          {barInf.map((barInf: BarInf, index: number) =>
            <InfoCard key={index}>
              <IconDiv>
                <IconeDinamico nome={barInf.nomico} size={30}/>
              </IconDiv>
              <span>
                {barInf.barinf}
              </span>
            </InfoCard>
          )}
        </>
      }
    </Container>
  );
}
