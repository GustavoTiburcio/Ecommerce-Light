import React, { useState, useEffect, useContext } from 'react';
import { AjudaDiv, SubContainer, ContatoDiv, ContatoIconsDiv, InstitucionalDiv, SegurancaDiv, WhatsappDiv, Container } from './styles';
import WhatsappSVG from '../../assets/images/Whatsapp.svg';
import Ssl from '../../assets/images/ssl.png';
import * as FaIcons from 'react-icons/fa';
import Copyright from '../Copyright';
import Context from '../../context/Context';

export default function Footer() {
  const { configs, gruposAjuda }: any = useContext(Context);

  //config
  const [instagramURI, setInstagramURI] = useState<string>('');
  const [facebookURI, setFacebookURI] = useState<string>('');

  //gruaju
  const [numTel, setNumTel] = useState<string>('');
  const [numCel, setNumCel] = useState<string>('');
  const [horFun, setHorFun] = useState<string>('');

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: instaURI }] = configs.filter((config: any) => config.con === 'Instagram');
      const [{ val: faceURI }] = configs.filter((config: any) => config.con === 'Facebook');

      setInstagramURI(instaURI);
      setFacebookURI(faceURI);
    }
  }, [configs]);

  useEffect(() => {
    if (gruposAjuda.length > 0) {
      const [grupoAjudaTelefone] = gruposAjuda.filter((config: any) => config.tipo === 'tel');
      if (grupoAjudaTelefone) {
        const { gruaju: tel } = grupoAjudaTelefone;
        setNumTel(tel);
      }

      const [grupoAjudaCel] = gruposAjuda.filter((config: any) => config.tipo === 'cel');
      if (grupoAjudaCel) {
        const { gruaju: cel } = grupoAjudaCel;
        setNumCel(cel);
      }

      const [grupoAjudaHorario] = gruposAjuda.filter((config: any) => config.tipo === 'horario');
      if (grupoAjudaHorario) {
        const { gruaju: horario } = grupoAjudaHorario;
        setHorFun(horario);
      }
    }
  }, [gruposAjuda]);

  return (
    <Container>
      <SubContainer>
        <WhatsappDiv
          href={numCel ? `https://api.whatsapp.com/send?phone=55${numCel.replace(/\D/g, '')}&text=Olá,%20poderia%20me%20ajudar?` : ''}
          target='_blank'
          rel="noreferrer"
        >
          <img src={WhatsappSVG} alt='Ajuda Whatsapp' />
        </WhatsappDiv>
        <ContatoDiv>
          <b>Atendimento</b>
          <span>{horFun}</span>
          {numTel && <span>Fone:{numTel}</span>}
          {numCel && <span>Cel:{numCel}</span>}
          <ContatoIconsDiv>
            <a
              href={facebookURI}
              target='_blank'
              rel="noreferrer"
            >
              <FaIcons.FaFacebook color='#1D1D1D' />
            </a>
            <a
              href={instagramURI}
              target='_blank'
              rel="noreferrer"
            >
              <FaIcons.FaInstagram color='#1D1D1D' />
            </a>
            <a><FaIcons.FaTwitter color='#1D1D1D' /></a>
            <a><FaIcons.FaYoutube color='#1D1D1D' /></a>
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
      </SubContainer>
      <Copyright />
    </Container>
  );
}
