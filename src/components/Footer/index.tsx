import React, { useState, useEffect, useContext } from 'react';
import { SubContainer, ContatoIconsDiv, RodapeDiv, ItemRodape, SegurancaDiv, WhatsappDiv, Container } from './styles';
import WhatsappSVG from '../../assets/images/Whatsapp.svg';
import Ssl from '../../assets/images/ssl.png';
import * as FaIcons from 'react-icons/fa';
import Copyright from '../Copyright';
import Context, { IContext, IItensRodape, IRodape } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const { configs, rodape }: IContext = useContext(Context);

  //config
  const [instagramURI, setInstagramURI] = useState<string>('');
  const [facebookURI, setFacebookURI] = useState<string>('');
  const [youtubeURI, setYoutubeURI] = useState<string>('');
  const [twitterURI, setTwitterURI] = useState<string>('');
  const [numCel, setNumCel] = useState<string>('');

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: instaURI }] = configs.filter((config: any) => config.con === 'Instagram');
      const [{ val: faceURI }] = configs.filter((config: any) => config.con === 'Facebook');
      const [{ val: youtURI }] = configs.filter((config: any) => config.con === 'ConYou');
      const [{ val: twitURI }] = configs.filter((config: any) => config.con === 'ConTwi');
      const [{ val: numWha }] = configs.filter((config: any) => config.con === 'NumWha');

      setInstagramURI(instaURI);
      setFacebookURI(faceURI);
      setYoutubeURI(youtURI);
      setTwitterURI(twitURI);
      setNumCel(numWha);
    }
  }, [configs]);

  return (
    <Container>
      <SubContainer>
        <WhatsappDiv
          href={numCel ? `https://api.whatsapp.com/send?phone=55${numCel.replace(/\D/g, '')}&text=Olá!! Vim pelo site,%20poderia%20me%20ajudar?` : ''}
          target='_blank'
          rel="noreferrer"
          width={rodape.length > 0 ? 100 / (rodape.length + 2) : 20}
        >
          <img src={WhatsappSVG} alt='Ajuda Whatsapp' />
        </WhatsappDiv>
        {rodape.sort((a: any, b: any) => a.ord - b.ord).map((rod: IRodape, index: number) => (
          <RodapeDiv
            key={index}
            width={rodape.length > 0 ? 100 / (rodape.length + 2) : 60}
          >
            <b>{rod.rod}</b>
            {rod.iterod.sort((a: any, b: any) => a.ord - b.ord).map((iterod: IItensRodape, i: number) => (
              <ItemRodape
                key={i}
                cursor={iterod.perresiterod.length > 0 ? 'pointer' : 'default'}
                onClick={() => {
                  if (iterod.perresiterod.length > 0) {
                    navigate(`/rodape/${iterod.iterod}`);
                  }
                }}
              >
                {iterod.iterod}
              </ItemRodape>
            ))}
            {index === 0 &&
              <ContatoIconsDiv>
                {facebookURI &&
                  <a
                    href={facebookURI}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <FaIcons.FaFacebook color='#1D1D1D' />
                  </a>
                }
                {instagramURI &&
                  <a
                    href={instagramURI}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <FaIcons.FaInstagram color='#1D1D1D' />
                  </a>
                }
                {twitterURI &&
                  <a
                    href={twitterURI}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <FaIcons.FaTwitter color='#1D1D1D' />
                  </a>}
                {youtubeURI &&
                  <a
                    href={youtubeURI}
                    target='_blank'
                    rel="noreferrer"
                  >
                    <FaIcons.FaYoutube color='#1D1D1D' />
                  </a>}
              </ContatoIconsDiv>
            }
          </RodapeDiv>
        ))}
        <SegurancaDiv
          width={rodape.length > 0 ? 100 / (rodape.length + 2) : 20}
        >
          <img src={Ssl} alt='Proteção' />
        </SegurancaDiv>
      </SubContainer>
      <Copyright />
    </Container>
  );
}
