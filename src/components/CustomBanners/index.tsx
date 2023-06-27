import React, { useState, useEffect } from 'react';
import { Container, ContainerBanners, ContainerImage, Image } from './styles';
import { IPrimaryBanner } from '../PrimaryBanner';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function CustomBanners() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<IPrimaryBanner[]>([]);

  async function getBanners() {
    try {
      const response = await api.get('/banner');
      if (response.status === 200) {
        const customBanners = response.data.filter((banner: IPrimaryBanner) => banner.tipban === 'S');
        const concatBannersPerRow = customBanners.reduce((acc: any, objeto: any) => {
          const { lin } = objeto;

          // Verifica se já existe um array com a mesma linha, senão cria um novo array vazio
          if (!acc[lin]) {
            acc[lin] = [];
          }

          // Adiciona o objeto ao array correspondente à linha
          acc[lin].push(objeto);

          return acc;
        }, []);

        //Limpa valores falsy do array
        const filtredBanners = concatBannersPerRow.filter((banner: any) => banner);

        setBanners(filtredBanners);
      }
    } catch (error: any) {
      toast.error('Failed to fetch banners. ' + error.message);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <Container display={banners.length === 0 ? 'none' : undefined}>
      {banners.map((bannerPorLinha: any, index: number) => (
        <ContainerBanners key={index}>
          {bannerPorLinha.sort((a: any, b: any) => a.col - b.col).map((banner: IPrimaryBanner, index: number) => (
            <ContainerImage
              key={index}
              width={bannerPorLinha.length > 1 ? (100 / bannerPorLinha.length) - 0.5 : 100}
              hoverText={Boolean(banner?.ban)}
              hover={bannerPorLinha.length > 1}
            >
              <Image
                src={'https://' + banner.linfot}
                style={{ cursor: banner.par ? 'pointer' : 'default' }}
                onClick={() => {
                  if (!banner.par) return;
                  navigate(`/productList/itemMenu=${banner?.par.replaceAll('=', ':')}`,
                    {
                      state: { caminho: 'Home' + (banner?.ban !== undefined && banner?.ban !== null ? ' > ' + banner.ban!.replaceAll('/', ' - ') : ''), linimaban: '' }
                    }
                  );
                }}
              />
              {banner.ban && <p>{banner.ban}</p>}
            </ContainerImage>
          ))}
        </ContainerBanners>
      ))}
    </Container>
  );
}
