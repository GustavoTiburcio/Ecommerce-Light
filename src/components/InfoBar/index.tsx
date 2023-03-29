import React from 'react';
import { Container, IconDiv, InfoCard } from './styles';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';

export default function InfoBar() {
  return (
    <Container>
      <InfoCard>
        <IconDiv>
          <FiIcons.FiBox size={30} />
        </IconDiv>
        <span>
          10% off na primeira compra usando o cupom AG10
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
    </Container>
  );
}
