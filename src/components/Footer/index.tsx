import React from 'react';
import { AjudaDiv, Container, ContatoDiv, ContatoIconsDiv, InstitucionalDiv, SegurancaDiv, WhatsappDiv } from './styles';
import WhatsappSVG from '../../assets/images/Whatsapp.svg';
import Ssl from '../../assets/images/ssl.png';
import * as FaIcons from 'react-icons/fa';

export default function Footer() {
  return (
    <Container>
      <WhatsappDiv>
        <img src={WhatsappSVG} alt='Ajuda Whatsapp' />
      </WhatsappDiv>
      <ContatoDiv>
        <b>Atendimento</b>
        <span>De segunda a sexta-feira das <b>8:00</b> às <b>18:00h.</b></span>
        <span>Fone:(44) 3033-0106</span>
        <ContatoIconsDiv>
          <a><FaIcons.FaFacebook /></a>
          <a><FaIcons.FaInstagram /></a>
          <a><FaIcons.FaTwitter /></a>
          <a><FaIcons.FaYoutube /></a>
        </ContatoIconsDiv>
      </ContatoDiv>
      <AjudaDiv>
        <b>Ajuda</b>
        <a>Dúvidas Frequentes</a>
        <a>Formas de entrega</a>
        <a>Formas de pagamento</a>
      </AjudaDiv>
      <InstitucionalDiv>
        <b>Institucional</b>
        <a>Sobre a marca</a>
        <a>Regulamentos</a>
        <a>Trocas e devoluções</a>
        <a>Política de privacidade</a>
        <a>Nossas lojas</a>
      </InstitucionalDiv>
      <SegurancaDiv>
        <img src={Ssl} alt='Proteção' />
      </SegurancaDiv>
    </Container>
  );
}
