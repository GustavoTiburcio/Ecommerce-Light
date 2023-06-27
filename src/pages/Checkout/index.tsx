import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Logo, MenuParalelo, SlideContainer, WrapInput, ButtonDiv, CarouselContainer, TotaisDiv, ProdutoDiv } from './styles';
import { Carousel } from 'react-responsive-carousel';
import { cnpjMask, cpfMask, validaCpfCnpj } from '../../utils/ValidaCpfCnpj';
import { Link, useNavigate } from 'react-router-dom';
import Context, { ICart, IConfigs, IContext, IUserAdress } from '../../context/Context';
import { BuscaEndereco } from '../../utils/buscaCep';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import ProgressBar from '../../components/ProgressBar';
import LoadingOverlay from 'react-loading-overlay-ts';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    configs,  cart,
    loginData,  setCart,
  }: IContext = useContext(Context);

  const [indexCarousel, setIndexCarousel] = useState(0);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  //Dados do comprador
  const [cgc, setCgc] = useState(loginData?.cgc ?? '');
  const [nom, setNom] = useState(loginData?.raz ?? '');
  const [email, setEmail] = useState(loginData?.username ?? '');
  const [cel, setCel] = useState(loginData?.fon ?? '');
  const [datNas, setDatNas] = useState('');

  //Endereço de entrega
  const [EndUsuPad]: IUserAdress[] = loginData.endUsu.filter((endUsu: IUserAdress) => endUsu.padent === 1);
  const [cep, setCep] = useState(EndUsuPad?.cep ?? '');
  const [log, setLog] = useState(EndUsuPad?.log ?? '');
  const [num, setNum] = useState(EndUsuPad?.num ?? '');
  const [com, setCom] = useState(EndUsuPad?.comlog ?? '');
  const [bai, setBai] = useState(EndUsuPad?.bai ?? '');
  const [cid, setCid] = useState(EndUsuPad?.cid ?? '');
  const [uf, setUf] = useState(EndUsuPad?.uf ?? '');
  const [codIbg, setCodIbg] = useState(EndUsuPad?.codibg ?? 0);

  //Carrinho e valores
  const [fre, setFre] = useState(0);
  const [subTot, setSubTot] = useState(0);
  const [itensCarrinho, setItensCarrinho] = useState<ICart[]>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  const slides = [
    {
      passo: 1,
      titulo: 'Dados Pessoais',
      component:
        <SlideContainer>
          <WrapInput>
            <input
              className={cgc !== '' ? 'has-val input' : 'input'}
              value={cgc}
              onChange={(e) => {
                if (e.target.value.length > 14) {
                  setCgc(cnpjMask(e.target.value));
                  return;
                }
                setCgc(cpfMask(e.target.value));
              }}
              enterKeyHint='done'
              maxLength={18}
            />
            <span className='focus-input' data-placeholder='CPF/CNPJ*'></span>
          </WrapInput>
          <WrapInput>
            <input
              className={nom !== '' ? 'has-val input' : 'input'}
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              enterKeyHint='done'
              maxLength={80}
            />
            <span className='focus-input' data-placeholder='Nome completo*'></span>
          </WrapInput>
          <WrapInput>
            <input
              className={email !== '' ? 'has-val input' : 'input'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              enterKeyHint='done'
              type='email'
              maxLength={60}
            />
            <span className='focus-input' data-placeholder='Email*'></span>
          </WrapInput>
          <MenuParalelo>
            <WrapInput>
              <input
                className={cel !== '' ? 'has-val input' : 'input'}
                value={cel}
                onChange={(e) => setCel(e.target.value)}
                enterKeyHint='done'
                type='tel'
                maxLength={11}
              />
              <span className='focus-input' data-placeholder='Celular*'></span>
            </WrapInput>
            <WrapInput>
              <input
                className={'has-val input'}
                value={datNas}
                onChange={(e) => setDatNas(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
                enterKeyHint='done'
                type='date'
                maxLength={14}
              />
              <span className='focus-input' data-placeholder='Data de nascimento'></span>
            </WrapInput>
          </MenuParalelo>
          <Button
            onClick={() => proximoPasso(indexCarousel)}
            onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
          >
            Próximo
          </Button>
        </SlideContainer>,
    },
    {
      passo: 2,
      titulo: 'Dados Entrega',
      component:
        <SlideContainer>
          <WrapInput>
            <input
              className={cep !== '' ? 'has-val input' : 'input'}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={async (e) => {
                if (e.target.value.length === 8) {
                  const dadosEndereco = await BuscaEndereco(e.target.value);
                  if (dadosEndereco) {
                    setBai(dadosEndereco.bairro);
                    setLog(dadosEndereco.logradouro);
                    setCid(dadosEndereco.localidade);
                    setUf(dadosEndereco.uf);
                    setNum('');
                    setCodIbg(dadosEndereco.ibge);
                  }
                }
              }}
              maxLength={8}
              enterKeyHint='done'
            />
            <span className='focus-input' data-placeholder='CEP*'></span>
          </WrapInput>
          <MenuParalelo>
            <WrapInput>
              <input
                className={log !== '' ? 'has-val input' : 'input'}
                value={log}
                onChange={(e) => setLog(e.target.value)}
                enterKeyHint='done'
                maxLength={80}
              />
              <span className='focus-input' data-placeholder='Endereço*'></span>
            </WrapInput>
            <WrapInput>
              <input
                className={num !== '' ? 'has-val input' : 'input'}
                value={num}
                onChange={(e) => setNum(e.target.value)}
                enterKeyHint='done'
                type='number'
                maxLength={10}
              />
              <span className='focus-input' data-placeholder='Número*'></span>
            </WrapInput>
          </MenuParalelo>
          <WrapInput>
            <input
              className={com !== '' ? 'has-val input' : 'input'}
              value={com}
              onChange={(e) => setCom(e.target.value)}
              enterKeyHint='done'
              maxLength={50}
            />
            <span className='focus-input' data-placeholder='Complemento'></span>
          </WrapInput>
          <WrapInput>
            <input
              className={bai !== '' ? 'has-val input' : 'input'}
              value={bai}
              onChange={(e) => setBai(e.target.value)}
              enterKeyHint='done'
              maxLength={60}
            />
            <span className='focus-input' data-placeholder='Bairro*'></span>
          </WrapInput>
          <MenuParalelo>
            <WrapInput>
              <input
                className={cid !== '' ? 'has-val input' : 'input'}
                value={cid}
                onChange={(e) => setCid(e.target.value)}
                enterKeyHint='done'
                maxLength={60}
              />
              <span className='focus-input' data-placeholder='Cidade*'></span>
            </WrapInput>
            <WrapInput>
              <input
                className={uf !== '' ? 'has-val input' : 'input'}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                enterKeyHint='done'
                onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
                maxLength={2}
              />
              <span className='focus-input' data-placeholder='Estado*'></span>
            </WrapInput>
          </MenuParalelo>
          <ButtonDiv>
            <span onClick={() => setIndexCarousel((prev) => prev - 1)}>Voltar</span>
            <Button
              onClick={() => proximoPasso(indexCarousel)}
              onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
            >
              Quase lá
            </Button>
          </ButtonDiv>
        </SlideContainer>,
    },
    {
      passo: 3,
      titulo: 'Revisão do Pedido',
      component:
        <SlideContainer>
          {itensCarrinho.map((itemCarrinho: ICart, index: number) =>
            <ProdutoDiv key={index}>
              <img src={itemCarrinho?.cor?.linkFot} title={itemCarrinho.cor.padmer} />
              <span>{itemCarrinho?.quantidade}x {itemCarrinho?.mer}{' '}{itemCarrinho.codtam}</span>
              <span>{formatCurrency(itemCarrinho?.valor)}</span>
              <b>{formatCurrency(+(itemCarrinho?.quantidade) * itemCarrinho?.valor)}</b>
            </ProdutoDiv>
          )}
          <br />
          <br />
          <TotaisDiv>
            <span>
              SubTotal: {formatCurrency(subTot)}
            </span>
            <span>
              Frete: {formatCurrency(fre)}
            </span>
            <b>
              Total: {formatCurrency(subTot + fre)}
            </b>
          </TotaisDiv>
          <br />
          <br />
          <br />
          <ButtonDiv>
            <span onClick={() => setIndexCarousel((prev) => prev - 1)}>Voltar</span>
            <Button
              onClick={postPedido}
              onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
            >
              Concluir Pagamento
            </Button>
          </ButtonDiv>
        </SlideContainer>,
    }
  ];

  function proximoPasso(passo: number) {
    switch (passo) {
      case 0:
        if (!validaCpfCnpj(cgc)) {
          toast.error('CPF/CNPJ inválido');
          return;
        }
        if (!nom) {
          toast.error('Nome inválido');
          return;
        }
        if (!email) {
          toast.error('Email inválido');
          return;
        }
        if (cel.length < 8) {
          toast.error('Celular inválido');
          return;
        }
        setIndexCarousel((passo) => passo + 1);
        break;
      case 1:
        if (cep.length < 8) {
          toast.error('Cep inválido');
          return;
        }
        if (!log) {
          toast.error('Endereço inválido');
          return;
        }
        if (!num) {
          toast.error('Número inválido');
          return;
        }
        if (!bai) {
          toast.error('Bairro inválido');
          return;
        }
        if (!cid) {
          toast.error('Cidade inválida');
          return;
        }
        if (!uf) {
          toast.error('Estado inválido');
          return;
        }
        calcularFrete({ log, num, bai, cid, uf, cep });
        setIndexCarousel((passo) => passo + 1);
        break;
      case 2:
        setIndexCarousel((passo) => passo + 1);
        break;
      default:
        break;
    }
  }

  async function calcularFrete(endereco: any) {
    try {
      console.log(endereco);
    } catch (error: any) {
      toast.error('Falha ao calcular frete. ' + error.message);
    }
  }

  async function postPedido() {
    try {
      setIsLoadingPost(true);

      const date = new Date();
      const dathor = date.toISOString();

      const itensPedido = itensCarrinho.map((itemCarrinho: ICart) => {
        return { obs: '', qua: itemCarrinho.quantidade, valuni: itemCarrinho.valor, mercador: { cod: itemCarrinho.codmer, mer: itemCarrinho.mer } };
      });

      const pedidoPayload: any = {
        cod: '', codcat: null, dathor: dathor,
        forpag: '', obs: '', sta: 'Pending',
        valfre: fre, valpro: +(fre + subTot).toFixed(2),
        appuser: {
          id: loginData.id
        }
      };

      pedidoPayload.itensPedido = itensPedido;

      const response = await api.post('/pedidos/salvarPed', pedidoPayload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        const endUsu = {
          cep: cep.replace(/[^0-9]/g, ''),
          log: log.normalize('NFD'),
          num: num,
          bai: bai.normalize('NFD'),
          cid: cid.normalize('NFD'),
          uf: uf,
          comlog: com.normalize('NFD'),
          codibg: codIbg,
          appuser: {
            id: loginData.id
          },
        };

        const dadosCliente = {
          id: loginData.id,
          username: loginData.username,
          password: loginData.password,
          fon: cel,
          cel: cel,
          ema: email,
          cgc: cgc,
          // insest: order.usuario.insest,
          fan: nom,
          raz: nom,
          datnas: datNas,
          // codtabpre: 0,
          tipusu: 'comum'
        };

        await api.put('/usuarios/atualizar', dadosCliente, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        await api.post('/endusus/salvar', endUsu, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        toast.success('Order sucess');
        // localStorage.removeItem('@Carrinho');
        setCart([]);
        navigate('/');
      }

    } catch (error: any) {
      toast.error('Failed to send order. ' + error.message);
    } finally {
      setIsLoadingPost(false);
    }
  }

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: uri }] = configs.filter((config: IConfigs) => config.config === 'logo');

      setLogoURI(uri);
    }
  }, [configs]);

  useEffect(() => {
    if (cart.length > 0) {
      setItensCarrinho(cart);
      setSubTot(cart.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue?.valor * +currentValue?.quantidade,
        0));
    }
  }, [cart]);

  useEffect(() => {
    if (loginData.id === 0) {
      toast.warning('Log in to continue.');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      toast.warning('Your cart is empty, add products to your cart before checkout.');
      navigate('/');
      return;
    }
  }, []);

  return (
    <LoadingOverlay
      active={isLoadingPost}
      spinner
      text='Aguarde...'
    >
      <Container>
        <ProgressBar
          steps={slides.map(slide => {
            return { label: slide.titulo, step: slide.passo };
          })}
          activeStep={indexCarousel + 1}
        />
        <CarouselContainer>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            swipeable={false}
            emulateTouch={true}
            selectedItem={indexCarousel}
            onChange={setIndexCarousel}
          >
            {slides.map((slide) => (
              <div key={slide.passo} className='carousel'>
                <h2>{slide.titulo}</h2>
                {slide.component}
              </div>
            ))}
          </Carousel>
        </CarouselContainer>
        <br />
        <Link to={'/'}>
          {logoURI && <Logo src={logoURI} alt='Logo' />}
        </Link>
      </Container>
    </LoadingOverlay>
  );
}
