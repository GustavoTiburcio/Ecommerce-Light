import React, { useState, useEffect } from 'react';
import { Container, ContainerBanners, ContainerImage, Image } from './styles';
import { IBannerPrimario } from '../BannerPrimario';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function BannersPersonalizados() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<IBannerPrimario[]>([]);

  async function getBanners() {
    try {
      const response = await api.get('/banner');
      if (response.status === 200) {
        const bannersSecundarios = response.data.filter((banner: IBannerPrimario) => banner.tipban === 'S');
        const juntarBannersPorLinha = bannersSecundarios.reduce((acc: any, objeto: any) => {
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
        const bannersFiltrados = juntarBannersPorLinha.filter((banner: any) => banner);

        setBanners(bannersFiltrados);
      }
    } catch (error: any) {
      toast.error('Falha ao buscar banners. ' + error.message);
    }
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <Container display={banners.length === 0 ? 'none' : undefined}>
      {banners.map((bannerPorLinha: any, index: number) => (
        <ContainerBanners key={index}>
          {bannerPorLinha.sort((a: any, b: any) => a.col - b.col).map((banner: IBannerPrimario, index: number) => (
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
                  navigate(`/produtoListagem/itemMenu=${banner?.par.replaceAll('=', ':')}`,
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
