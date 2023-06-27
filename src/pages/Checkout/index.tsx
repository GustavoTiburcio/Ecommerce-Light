import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Logo, MenuParalelo, CheckBoxButtonDiv, SlideContainer, WrapInput, ButtonDiv, CarouselContainer, TotaisDiv, ProdutoDiv } from './styles';
import { Carousel } from 'react-responsive-carousel';
import { cnpjMask, cpfMask, validaCpfCnpj } from '../../utils/ValidaCpfCnpj';
import { Link, useNavigate } from 'react-router-dom';
import Context, { ICart, IContext, IUserAdress } from '../../context/Context';
import { BuscaEndereco } from '../../utils/buscaCep';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import ProgressBar from '../../components/ProgressBar';
import LogoCielo from '../../assets/images/logoCielo.svg';
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

  //Dados extra da entrega
  const [retLoj, setRetLoj] = useState(false);
  const [pagRet, setPagRet] = useState(false);
  const [dest, setDest] = useState('');
  const [celDest, setCelDest] = useState('');
  const [datEnt, setDatEnt] = useState('');
  const [horIni, setHorIni] = useState('');
  const [horFin, setHorFin] = useState('');
  const [menCar, setMenCar] = useState('');

  //Carrinho e valores
  const [fre, setFre] = useState(0);
  const [subTot, setSubTot] = useState(0);
  const [itensCarrinho, setItensCarrinho] = useState<ICart[]>([]);

  //config
  const [logoURI, setLogoURI] = useState<string>('');
  const [keyApiGoo, setKeyApiGoo] = useState<string>('0');
  const [usaDadExtEnt, setUsaDadExtEnt] = useState<boolean>(false);
  const [usaOpcPagRetLoj, setUsaOpcPagRetLoj] = useState<boolean>(false);
  const [usaCielo, setUsaCielo] = useState<boolean>(false);
  const [quaMaxPar, setQuaMaxPar] = useState(1);
  const [valMinPar, setValMinPar] = useState(1);

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
              Frete: {retLoj ? 'grátis' : formatCurrency(fre)}
            </span>
            <b>
              Total: {retLoj ? formatCurrency(subTot) : formatCurrency(subTot + fre)}
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
          {usaCielo && <img src={LogoCielo} height='20' width='20' />}
        </SlideContainer>,
    }
  ];

  //Se usar dados extras de entra é acrescentado um novo passo no slide, exemplo de cliente que usa: Floricultura Viverde
  if (usaDadExtEnt) {
    const novoPasso = {
      passo: 3,
      titulo: 'Dados Extras',
      component:
        <SlideContainer>
          {usaOpcPagRetLoj && <CheckBoxButtonDiv>
            <input
              type='checkbox'
              value='false'
              onChange={() => {
                setRetLoj(!retLoj);
                setPagRet(false);
              }}
            />  Retirar na loja
            {retLoj &&
              <>
                <input
                  type='checkbox'
                  value='false'
                  onChange={() =>
                    setPagRet(!pagRet)
                  }
                />
                Pagar na Retirada
              </>
            }
          </CheckBoxButtonDiv>}
          <WrapInput>
            <input
              className={dest !== '' ? 'has-val input' : 'input'}
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              enterKeyHint='done'
              maxLength={50}
            />
            <span className='focus-input' data-placeholder='Quem vai receber?*'></span>
          </WrapInput>
          <MenuParalelo>
            <WrapInput>
              <input
                className={celDest !== '' ? 'has-val input' : 'input'}
                value={celDest}
                onChange={(e) => setCelDest(e.target.value)}
                enterKeyHint='done'
                type='tel'
                maxLength={11}
              />
              <span className='focus-input' data-placeholder='Celular*'></span>
            </WrapInput>
            <WrapInput>
              <input
                className={'has-val input'}
                value={datEnt}
                onChange={(e) => setDatEnt(e.target.value)}
                enterKeyHint='done'
                type='date'
              />
              <span className='focus-input' data-placeholder='Data da Entrega*'></span>
            </WrapInput>
          </MenuParalelo>
          <MenuParalelo>
            <WrapInput>
              <input
                className={'has-val input'}
                value={horIni}
                onChange={(e) => setHorIni(e.target.value)}
                onBlur={(e) => {
                  if (horIni === '') return;
                  if (e.target.value < '08:00') {
                    toast.warn('Horário inicial de entrega inválido');
                    setHorIni('');
                    return;
                  }
                  if (e.target.value >= '18:00') {
                    toast.warn('Horário inicial de entrega inválido');
                    setHorIni('');
                    return;
                  }
                }}
                enterKeyHint='done'
                type='time'
              />
              <span className='focus-input' data-placeholder='Hora inicial*'></span>
            </WrapInput>
            <WrapInput>
              <input
                className={'has-val input'}
                value={horFin}
                onChange={(e) => setHorFin(e.target.value)}
                onBlur={(e) => {
                  if (horFin === '') return;
                  if (e.target.value > '18:00') {
                    toast.warn('Horário final de entrega inválido');
                    setHorFin('');
                    return;
                  }
                  if (e.target.value <= '08:00') {
                    toast.warn('Horário final de entrega inválido');
                    setHorFin('');
                    return;
                  }
                }}
                enterKeyHint='done'
                type='time'
              />
              <span className='focus-input' data-placeholder='Hora final*'></span>
            </WrapInput>
          </MenuParalelo>
          <WrapInput>
            <input
              className={menCar !== '' ? 'has-val input' : 'input'}
              value={menCar}
              onChange={(e) => setMenCar(e.target.value)}
              enterKeyHint='done'
            />
            <span className='focus-input' data-placeholder='Mensagem para o Cartão'></span>
          </WrapInput>
          {!retLoj && <span>Taxa de Entrega: {formatCurrency(fre)}</span>}
          <ButtonDiv>
            <span onClick={() => setIndexCarousel((prev) => prev - 1)}>Voltar</span>
            <Button
              onClick={() => proximoPasso(indexCarousel)}
              onKeyDown={(e) => { if (e.key === 'Tab') e.preventDefault(); }}
            >
              Prosseguir
            </Button>
          </ButtonDiv>
        </SlideContainer>,
    };
    slides.splice(slides.length - 1, 0, novoPasso);
    slides[slides.length - 1]['passo'] = 4;
  }

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
        if (!dest) {
          toast.error('Destinatário inválido');
          return;
        }
        if (celDest.length < 8) {
          toast.error('Celular do Destinatário inválido');
          return;
        }
        if (!datEnt) {
          toast.error('Data de entrega inválida');
          return;
        }
        if (!horIni) {
          toast.error('Hora inicial de entrega inválida');
          return;
        }
        if (!horFin) {
          toast.error('Hora final de entrega inválida');
          return;
        }
        setIndexCarousel((passo) => passo + 1);
        break;
      default:
        break;
    }
  }

  async function calcularFrete(endereco: any) {
    try {
      if (keyApiGoo !== '0') {
        const destino = endereco.log + ', ' +
          endereco.num + ' - ' + endereco.bai + ', ' + endereco.cid + ' - ' +
          endereco.uf + ', ' + endereco.cep;
        const response = await api.get(`/pedidos/CalcularDistanciaParaEntregar?destino=${destino}`);
        if (response.status === 200) {
          if (response.data.length > 0) {
            setFre(+(response.data[0].valor.replace(',', '.')));
          }
        }
      }
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
        forpag: '', obs: '', sta: pagRet ? 'Pagamento Futuro' : 'Pendente',
        valfre: retLoj ? 0 : fre, valpro: +(fre + subTot).toFixed(2), retloj: +retLoj, pagloj: +pagRet,
        quevairec: dest, datent: datEnt, horini: horIni,
        horfin: horFin, men: menCar, telquevairec: celDest,
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

        if (usaCielo && !pagRet) {
          let shipping: any = { type: 'WithoutShippingPickUp' };
          const maximoDeParcelas = +((subTot + fre) / quaMaxPar) < valMinPar ? 1 : +quaMaxPar;

          const itemsCielo = itensCarrinho.map((item: any) => {
            return {
              name: item.mer,
              quantity: item.quantidade,
              unitPrice: (item.valor * 100),
              type: 'Asset'
            };
          });

          if (pedidoPayload.valfre !== 0 && !retLoj) {
            shipping = {
              type: 'FixedAmount',
              targetZipCode: cep.replace(/[^0-9]/g, ''),
              services: [{
                name: 'Motoboy',
                price: (pedidoPayload.valfre * 100),
              }],
              address: {
                street: log.normalize('NFD'),
                number: num,
                complement: com.normalize('NFD'),
                district: bai.normalize('NFD'),
                city: cid.normalize('NFD'),
                state: uf
              }
            };
          }

          const cieloPayload = {
            'orderNumber': response.data.cod,
            'cart': {
              'discount': {
                'type': 'Percent',
                'value': 0,
              },
              'items': itemsCielo,
            },
            'shipping': shipping,
            'payment': {
              'installments': maximoDeParcelas,
              'maxNumberOfInstallments': maximoDeParcelas,
            },

            'customer': {
              'identity': cgc.replace(/[^0-9]/g, ''),
              'fullName': nom,
              'email': email,
              'phone': cel.replace(/[^0-9]/g, ''),
            },
          };

          const responseCielo = await api.post('/pedidos/recebeEEnviaDadosCielo', cieloPayload, {
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (responseCielo.status === 200) {

            pedidoPayload.cod = response.data.cod;
            pedidoPayload.obs = `Pagamento disponível em ${responseCielo.data.settings.checkoutUrl}`;

            await api.put('/pedidos/alterarPedido', pedidoPayload, {
              headers: {
                'Content-Type': 'application/json',
              }
            });

            // localStorage.removeItem('@Carrinho');
            setCart([]);
            window.location.href = responseCielo.data.settings.checkoutUrl;
            return;
          }
          throw Error('Falha ao enviar pedido pra cielo');
        }

        toast.success('Pedido enviado com sucesso');
        // localStorage.removeItem('@Carrinho');
        setCart([]);
        navigate('/');
      }

    } catch (error: any) {
      toast.error('Falha ao finalizar pedido. ' + error.message);
    } finally {
      setIsLoadingPost(false);
    }
  }

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      const [{ val: keyApiGoo }] = configs.filter((config: any) => config.con === 'KeyApiGoo');
      const [{ val: usaDadExtEnt }] = configs.filter((config: any) => config.con === 'UsaDadExtEnt');
      const [{ val: usaOpcPagRetLoj }] = configs.filter((config: any) => config.con === 'UsaOpcPagRetLoj');
      const [{ val: cieMerId }] = configs.filter((config: any) => config.con === 'CieMerId');
      const [{ val: quaMaxPar }] = configs.filter((config: any) => config.con === 'quamaxpar');
      const [{ val: valminpar }] = configs.filter((config: any) => config.con === 'valminpar');

      setLogoURI('https://' + uri);
      setKeyApiGoo(keyApiGoo);
      setUsaDadExtEnt(Boolean(+usaDadExtEnt));
      setUsaOpcPagRetLoj(Boolean(+usaOpcPagRetLoj));
      setUsaCielo(Boolean(cieMerId));
      setQuaMaxPar(quaMaxPar);
      setValMinPar(valminpar);
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
      toast.warning('Faça login para finalizar o pedido.');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      toast.warning('Seu carrinho está vazio, monte seu carrinho antes de fechar seu pedido.');
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
