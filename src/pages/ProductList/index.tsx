import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import Accordion from '../../components/Accordion';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import {
  Container, Banner, TitleDiv, ProdutosDiv,
  FiltrosDiv, CardsDiv, ActivityIndicator, NotFoundDiv
} from './styles';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Context, { IConfigs, IContext, IWishList } from '../../context/Context';
import NotFoundSvg from '../../assets/images/not_found.svg';
import SelectInput from '../../components/SelectInput';
import { formatCurrency } from '../../utils/formatCurrency';

interface IProdutoCard {
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: number;
  esgSit?: boolean;
}

export default function ProductList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = useParams();
  const { configs, loginData, setWishList }: IContext = useContext(Context);
  const termoPesquisa = search?.split('=') ?? [];

  const [produtos, setProdutos] = useState<IProdutoCard[]>([]);
  const [temMais, setTemMais] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //filtros
  const [ordem, setOrdem] = useState<any>('mer,asc');
  const [filtroCores, setFiltroCores] = useState<any>([]);
  const [filtroTamanhos, setFiltroTamanhos] = useState<any>([]);
  const [filtroValVen, setFiltroValVen] = useState<any>({ min: 0, max: 0 });
  const [filtroValVenSelecionado, setFiltroValVenSelecionado] = useState<any>({ min: '', max: '' });
  const [filtroCoresSelecionadas, setFiltroCoresSelecionadas] = useState<string[]>([]);
  const [filtroTamanhosSelecionados, setFiltroTamanhosSelecionados] = useState<string[]>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  async function getProdutos() {
    try {
      if (!termoPesquisa || termoPesquisa.length < 2) {
        throw Error('URL inválida');
      }

      if (termoPesquisa[0] === 'listaDesejos') {
        getListaDesejo();
        return;
      }

      if (!temMais) return;

      setIsLoading(true);

      const params = {
        page: pagina,
        codtabpre: 0,
        size: 8,
        sort: ordem,
        cores: filtroCoresSelecionadas.join(','),
        tamanhos: filtroTamanhosSelecionados.join(','),
        valvenmin: filtroValVenSelecionado.min,
        valvenmax: filtroValVenSelecionado.max,
        ...(termoPesquisa[0] === 'secMer' && { secmer: termoPesquisa[1]?.replaceAll(' - ', '/') }),
        ...(termoPesquisa[0] === 'itemMenu' && { itemClicado: termoPesquisa[1]?.replaceAll(':', '=') }),
        ...(termoPesquisa[0] === 'pesquisa' && { pesquisa: termoPesquisa[1]?.replaceAll(' - ', '/') }),
        ...(termoPesquisa[0] === 'subSecMer' && { subsecmer: termoPesquisa[1]?.replaceAll(' - ', '/') }),
      };

      const responseMercador = await api.get('/mercador/listarProdutosCard', {
        params: params
      });

      if (responseMercador.status === 200) {

        if (responseMercador.data.content.length === 0) {
          setTemMais(false);
          return;
        }

        const newProdutos: IProdutoCard[] = responseMercador.data.content.map((produto: any) => {
          return {
            linkFot: produto.linkFot ? 'https://' + produto.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
            mer: produto.mer,
            codbar: produto.codBar,
            valVenMin: produto.valVenMin,
            esgSit: Boolean(produto.esgSit)
          };
        });
        setProdutos([...produtos, ...newProdutos]);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar produtos. ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function getListaDesejo() {
    try {

      if (loginData.id === 0) {
        toast.warning('Faça login para acessar sua lista de desejos');
        navigate('/login');
        return;
      }

      const response = await api.get(`/itelisdes/listarPorUsuario?id=${loginData.id}`);

      if (response.status === 200) {
        if (response.data === 'Produto não encontrado') {
          return;
        }

        const listaDeDesejosNuvem: IWishList[] = response.data.content.map((iteLisDes: any) => {
          return {
            cod: iteLisDes.codIteLisDes,
            codmer: iteLisDes.cod,
            linkFot: iteLisDes.linkFot ? 'https://' + iteLisDes.linkFot : 'https://infoworld.am3shop.com.br/arquivos/08784917000136/publico/produto-padrao.jpg',
            mer: iteLisDes.mer,
            codbar: iteLisDes.codBar,
            valVenMin: iteLisDes.valVenMin
          };
        });

        if (listaDeDesejosNuvem.length > 0) {
          setWishList(listaDeDesejosNuvem);
          setProdutos(listaDeDesejosNuvem);
          setTemMais(false);
          return;
        }

      }

    } catch (error: any) {
      console.log('Falha ao buscar lista de desejos. ' + error.message);
    }
  }

  async function getFiltros() {
    try {
      setFiltroCoresSelecionadas([]);
      setFiltroTamanhosSelecionados([]);
      setFiltroValVenSelecionado({ min: '', max: '' });

      if (termoPesquisa[0] === 'listaDesejos') return;

      const params = {
        page: 0,
        codtabpre: 0,
        ...(termoPesquisa[0] === 'secMer' && { secmer: termoPesquisa[1]?.replaceAll(' - ', '/') }),
        ...(termoPesquisa[0] === 'itemMenu' && { itemClicado: termoPesquisa[1]?.replaceAll(':', '=') }),
        ...(termoPesquisa[0] === 'pesquisa' && { pesquisa: termoPesquisa[1]?.replaceAll(' - ', '/') }),
        ...(termoPesquisa[0] === 'subSecMer' && { subsecmer: termoPesquisa[1]?.replaceAll(' - ', '/') }),
      };

      const response = await api.get('/mercador/listarItensFiltros', {
        params: params
      });

      if (response?.status === 200 && response.data !== 'Nenhum produto a exibir') {
        const {
          cores, tamanhos,
          valVenMin, valVenMax
        } = response.data;

        setFiltroCores(cores.map((cor: any) => { return { cod: cor.cod, texto: cor.padmer }; }));
        setFiltroTamanhos(tamanhos.map((tamanho: string) => { return { cod: tamanho, texto: tamanho }; }));
        setFiltroValVen({ min: valVenMin, max: valVenMax });
        setFiltroValVenSelecionado({ min: '', max: valVenMax });
      }
    } catch (error: any) {
      toast.error('Falha ao buscar filtro. ' + error.message);
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
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    produtos.length = 0;
    setPagina(0);
    setTemMais(true);
    getProdutos();
  }

  useEffect(() => {
    novaPesquisa();
  }, [search, ordem, filtroCoresSelecionadas, filtroTamanhosSelecionados]);

  useEffect(() => {
    getProdutos();
  }, [pagina]);

  useEffect(() => {
    getFiltros();
  }, [search]);

  //Busca mais produtos quando usuario scrolla até o final da página
  useEffect(() => {
    if (temMais) {
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [produtos]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: uri }] = configs.filter((config: IConfigs) => config.config === 'logo');

      setLogoURI(uri);
    }
  }, [configs]);

  return (
    <Container>
      {location.state?.linimaban && location.state?.linimaban !== '' && <Banner src={'https://' + location.state.linimaban} />}
      <TitleDiv>
        {/* <span>{location?.state?.caminho ?? ''}</span> */}
        <span></span>

        {termoPesquisa.length > 1 ? termoPesquisa[0] === 'pesquisa' ?
          <b>{`Palavra - chave: ${termoPesquisa[1].replaceAll(' - ', '/')}`}</b> :
          <b>{`${location?.state?.caminho ?? ''}`}</b>
          : ''}
        {termoPesquisa[0] === 'listaDesejos' && <b>Lista de Desejos</b>}
        {
          termoPesquisa[0] !== 'listaDesejos' ?
            <SelectInput
              value={ordem}
              onChange={setOrdem}
              options={[
                { value: 'mer,asc', text: 'De A a Z' },
                { value: 'mer,desc', text: 'De Z a A' },
                { value: 'valvenmin,asc', text: 'Menor Preço' },
                { value: 'valvenmin,desc', text: 'Maior Preço' },
              ]}
            /> :
            <div />
        }
      </TitleDiv>
      <ProdutosDiv>
        <FiltrosDiv>
          {termoPesquisa[0] !== 'listaDesejos' &&
            <>
              <span>
                Filtros
              </span>
              {filtroCores.length > 0 &&
                <Accordion
                  title={'Cores'}
                  text={'Cores'}
                  checkboxInputArray={filtroCores}
                  checkboxInputValuesArray={filtroCoresSelecionadas}
                  setFilter={setFiltroCoresSelecionadas}
                />
              }
              {filtroTamanhos.length > 0 &&
                <Accordion
                  title={'Tamanho'}
                  text={'Tamanhos'}
                  checkboxInputArray={filtroTamanhos}
                  checkboxInputValuesArray={filtroTamanhosSelecionados}
                  setFilter={setFiltroTamanhosSelecionados}
                />
              }
              {filtroValVen.max !== 0 &&
                <>
                  <br />
                  <p>Faixa de preço</p>
                  <input
                    type="range"
                    value={filtroValVenSelecionado.max}
                    min={0}
                    max={filtroValVen.max}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = +event.target.value;
                      setFiltroValVenSelecionado({ min: '', max: value });
                    }}
                    onMouseUp={(event: any) => {
                      event.preventDefault();
                      novaPesquisa();
                    }}
                    onTouchEnd={(event: any) => {
                      event.preventDefault();
                      novaPesquisa();
                    }}
                  />
                  <strong>Até {formatCurrency(filtroValVenSelecionado.max)}</strong>
                </>
              }
            </>
          }
        </FiltrosDiv>
        <CardsDiv>
          {produtos.length > 0 ? produtos.map((produto: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <Card
                  imageSrc={produto.linkFot}
                  name={produto.mer}
                  sku={produto.codbar}
                  price={produto.valVenMin}
                  soldOut={produto.esgSit}
                />
              </React.Fragment>);
          }) :
            !isLoading &&
            <NotFoundDiv>
              <img src={NotFoundSvg} />
              <b>Não encontramos nenhum resultado para sua busca. Tente palavras menos específicas ou palavras-chave e filtros diferentes.</b>
            </NotFoundDiv>
          }
        </CardsDiv>
      </ProdutosDiv>
      {isLoading &&
        <ActivityIndicator src={logoURI} alt='Logo' />
      }
      <Footer />
    </Container>
  );
}
