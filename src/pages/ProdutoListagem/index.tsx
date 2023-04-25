import React, { useState, useEffect, useContext } from 'react';
import Accordion from '../../components/Accordion';
import Card from '../../components/Card';
// import Footer from '../../components/Footer';
import {
  Container, Banner, TitleDiv, ProdutosDiv,
  FiltrosDiv, CardsDiv, InputSlider, ActivityIndicator, NotFoundDiv
} from './styles';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLocation, useParams } from 'react-router-dom';
import Context from '../../context/Context';
import NotFoundSvg from '../../assets/images/not_found.svg';

interface ProdutoCardProps {
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: string | number;
  parcelamento?: string;
}

export default function ProdutoListagem() {
  const location = useLocation();
  const { pesquisa } = useParams();
  const { configs }: any = useContext(Context);

  const [produtos, setProdutos] = useState<ProdutoCardProps[]>([]);
  const [temMais, setTemMais] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  async function getProdutos() {
    let response;

    try {
      if (!temMais) return;

      setIsLoading(true);

      if (location.state?.tipoDePesquisa === 'itemMenuTodosSecMer') {
        response = await api.get(`mercador/RetornaParametrosItemMenuTodasCategorias?page=${pagina}&secmer=${pesquisa}&subsecmer=&CODTABPRE=0&size=8`);
      } else if (location.state?.tipoDePesquisa === 'itemMenu') {
        response = await api.get(`mercador/RetornaParametrosItemMenuPersonalizado?page=${pagina}&itemClicado=${pesquisa}&CODTABPRE=0&size=8`);
      } else {
        response = await api.get(`/mercador/listarProdutosCard?page=${pagina}&PESQUISA=${pesquisa}&size=8`);
      }

      if (response.status === 200) {
        if (response.data.content.length === 0) {
          setTemMais(false);
          return;
        }

        const newProdutos: ProdutoCardProps[] = response.data.content.map((produto: any) => {
          return {
            linkFot: produto.linkFot ? 'https://' + produto.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
            mer: produto.mer,
            codbar: produto.codBar,
            valVenMin: formatCurrency(produto.valVenMin),
            parcelamento: `3x de ${formatCurrency(produto.valVenMin / 3)}`
          };
        });

        setProdutos([...produtos, ...newProdutos]);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar produtos ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }


  function onScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight + 150 >= scrollHeight) {
      setPagina(pagina + 1);
    }
  }

  function novaPesquisa() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    produtos.length = 0;
    setPagina(0);
    setTemMais(true);
    getProdutos();
  }

  useEffect(() => {
    novaPesquisa();
  }, [pesquisa]);


  useEffect(() => {
    getProdutos();
  }, [pagina]);

  //Busca mais produtos quando usuario scrolla até o final da página
  useEffect(() => {
    if (temMais) {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [produtos]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  return (
    <Container>
      {!pesquisa && <Banner src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/b463a0cf-e1e3-4a9d-834a-714c38de43b4___ed11e381031b526d361b84ee82e8e02f.jpg' />}
      <TitleDiv>
        <span>Home {'>'} Feminino {'>'} Fitness</span>
        <b>{`Palavra-chave: ${pesquisa}`}</b>
        <span>Ordenação</span>
      </TitleDiv>
      <ProdutosDiv>
        <FiltrosDiv>
          <span>
            Filtros
          </span>
          <Accordion titulo={'Cores'} conteudo={'Cores'} />
          <Accordion titulo={'Tamanho'} conteudo={'Tamanhos'} />
          <p>Faixa de preço</p>
          <InputSlider
            type="range" name="preço" min="0" max="50"
          />
        </FiltrosDiv>
        <CardsDiv>
          {produtos.length > 0 ? produtos.map((produto: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Card
                  imageSrc={produto.linkFot}
                  nome={produto.mer}
                  codbar={produto.codbar}
                  preço={produto.valVenMin}
                  parcelamento={produto.parcelamento}
                />
              </React.Fragment>);
          }) :
            !isLoading &&
            <NotFoundDiv>
              <img src={NotFoundSvg}/>
              <b>Não encontramos nenhum resultado para sua busca. Tente palavras menos específicas ou palavras-chave diferentes.</b>
            </NotFoundDiv>
          }
        </CardsDiv>
      </ProdutosDiv>
      {isLoading &&
        <ActivityIndicator src={logoURI} alt='Logo' />
      }
      {/* <Footer /> */}
    </Container>
  );
}
