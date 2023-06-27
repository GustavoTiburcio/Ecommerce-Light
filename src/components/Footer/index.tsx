import React, { useState, useEffect, useContext } from 'react';
import { SubContainer, ContatoIconsDiv, RodapeDiv, ItemRodape, SegurancaDiv, WhatsappDiv, Container } from './styles';
import WhatsappSVG from '../../assets/images/Whatsapp.svg';
import Ssl from '../../assets/images/ssl.png';
import * as FaIcons from 'react-icons/fa';
import Copyright from '../Copyright';
import Context, { IContext, IFooterItens, IFooter, IConfigs } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const { configs, footer }: IContext = useContext(Context);

  //config
  const [instagramURI, setInstagramURI] = useState<string>('');
  const [facebookURI, setFacebookURI] = useState<string>('');
  const [youtubeURI, setYoutubeURI] = useState<string>('');
  const [twitterURI, setTwitterURI] = useState<string>('');
  const [numCel, setNumCel] = useState<string>('');

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: instaURI }] = configs.filter((config: IConfigs) => config.config === 'instagram');
      const [{ value: faceURI }] = configs.filter((config: IConfigs) => config.config === 'facebook');
      const [{ value: youtURI }] = configs.filter((config: IConfigs) => config.config === 'youtube');
      const [{ value: twitURI }] = configs.filter((config: IConfigs) => config.config === 'twitter');
      const [{ value: numWha }] = configs.filter((config: IConfigs) => config.config === 'whatsapp');

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
          href={numCel ? `https://api.whatsapp.com/send?phone=55${numCel.replace(/\D/g, '')}&text=Hello there!!` : ''}
          target='_blank'
          rel="noreferrer"
          width={footer.length > 0 ? 100 / (footer.length + 2) : 20}
        >
          <img src={WhatsappSVG} alt='Ajuda Whatsapp' />
        </WhatsappDiv>
        {footer.sort((a: any, b: any) => a.ord - b.ord).map((foot: IFooter, index: number) => (
          <RodapeDiv
            key={index}
            width={footer.length > 0 ? 100 / (footer.length + 2) : 60}
          >
            <b>{foot.title}</b>
            {foot.footerItens.sort((a: any, b: any) => a.ord - b.ord).map((footerItens: IFooterItens, i: number) => (
              <ItemRodape
                key={i}
                cursor={footerItens.footerSubItens.length > 0 ? 'pointer' : 'default'}
                onClick={() => {
                  if (footerItens.footerSubItens.length > 0) {
                    navigate(`/footer/${footerItens.text}`);
                  }
                }}
              >
                {footerItens.text}
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
        {/* <SegurancaDiv
          width={footer.length > 0 ? 100 / (footer.length + 2) : 20}
        >
          <img src={Ssl} alt='Proteção' />
        </SegurancaDiv> */}
      </SubContainer>
      <Copyright />
    </Container>
  );
}
