import React, { useState, useEffect } from 'react';
import { Container, IconDiv, IconDivMobile, InfoCard, MobileDiv } from './styles';
import useWindowDimensions from '../../utils/WindowDimensions';
import { Carousel } from 'react-responsive-carousel';
import DynamicIcon from '../DynamicIcon';
import { toast } from 'react-toastify';
import { infoBarMock } from '../../Mocks/apiMocks';

export interface IInfoBar {
  id: number;
  text: string;
  iconName?: string;
  ord: number;
}

export default function InfoBar() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [barInf, setBarInf] = useState<IInfoBar[]>([]);

  async function getInformationBarData() {
    try {
      setBarInf(infoBarMock.sort((a: IInfoBar, b: IInfoBar) => a.ord - b.ord));
    } catch (error: any) {
      toast.error('Failed to fetch information bar. ' + error.message);
    }
  }

  useEffect(() => {
    getInformationBarData();
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
          {barInf.length > 0 && barInf.map((barInf: IInfoBar, index: number) =>
            <MobileDiv key={index}>
              <IconDivMobile>
                <DynamicIcon name={barInf.iconName} size={30} />
              </IconDivMobile>
              <span>
                {barInf.text}
              </span>
            </MobileDiv>
          )}
        </Carousel> :
        <>
          {barInf.map((barInf: IInfoBar, index: number) =>
            <InfoCard key={index}>
              <IconDiv>
                <DynamicIcon name={barInf.iconName} size={30} />
              </IconDiv>
              <span>
                {barInf.text}
              </span>
            </InfoCard>
          )}
        </>
      }
    </Container>
  );
}
