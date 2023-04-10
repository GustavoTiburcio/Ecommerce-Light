import React from 'react';
import { Container, IconDiv, InfoCard, MobileDiv } from './styles';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import useWindowDimensions from '../../utils/WindowDimensions';
import { Carousel } from 'react-responsive-carousel';

export default function InfoBar() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;

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
          autoPlay
        >
          <MobileDiv>
            <FiIcons.FiBox size={20} />
            <span>
              10% off na primeira compra, cupom AG10
            </span>
          </MobileDiv>
          <MobileDiv>
            <RiIcons.RiMoneyDollarCircleLine size={20} />
            <span>
              Parcele em até 6x sem Juros
            </span>
          </MobileDiv>
          <MobileDiv>
            <FiIcons.FiTruck size={20} />
            <span>
              Frete Grátis para todo Brasil nas compras a partir de R$ 239,90
            </span>
          </MobileDiv>
          <MobileDiv>
            <RiIcons.RiCoupon3Line size={20} />
            <span>
              5% off no Pix
            </span>
          </MobileDiv>
        </Carousel> :
        <>
          <InfoCard>
            <IconDiv>
              <FiIcons.FiBox size={30} />
            </IconDiv>
            <span>
              10% off na primeira compra, cupom AG10
            </span>
          </InfoCard>
          <InfoCard>
            <IconDiv>
              <RiIcons.RiMoneyDollarCircleLine size={30} />
            </IconDiv>
            <span>
              Parcele em até 6x sem Juros
            </span>
          </InfoCard>
          <InfoCard>
            <IconDiv>
              <FiIcons.FiTruck size={30} />
            </IconDiv>
            <span>
              Frete Grátis para todo Brasil nas compras a partir de R$ 239,90
            </span>
          </InfoCard>
          <InfoCard>
            <IconDiv>
              <RiIcons.RiCoupon3Line size={30} />
            </IconDiv>
            <span>
              5% off no Pix
            </span>
          </InfoCard>
        </>
      }
    </Container>
  );
}
