import React, { useState, useContext, useEffect } from 'react';
import { JSX } from '@react/types';
import {
  AlterarSenhaForm, Button, Container, DadosDiv, DadosPessoaisForm, DetalhesPedidoButtonsDiv, DetalhesPedidoDiv, EnderecoDiv, FiltrosDiv, MenuButtons, MenuButtonsContainer, MenuContainer,
  MenuInfoContainer, ModalDiv, PedidoButtonDiv, PedidoInfoDiv, PedidoObsDiv, PedidoStatusDiv,
  PedidoValorDiv, PedidosDiv, ProdutosDiv, ProdutosInfoDiv, TablePedidoLinhaDiv, TablePedidoTitleDiv, TitleContainer
} from './styles';
import DynamicIcon from '../../components/DynamicIcon';
import SelectInput from '../../components/SelectInput';
import Context, { IContext, ILoginData, IUserAdress } from '../../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatarDataHora } from '../../utils/formatarDataHora';
import { cnpjMask, validaCpfCnpj } from '../../utils/ValidaCpfCnpj';
import { cpfMask } from '../../utils/ValidaCpfCnpj';
import { validaEmail } from '../../utils/ValidaCpfCnpj';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ReactModal from 'react-modal';
import useWindowDimensions from '../../utils/WindowDimensions';
import * as AiIcons from 'react-icons/ai';
import { gerarPDF } from '../../utils/gerarPdf';

interface IMenuOptions {
  name: string;
  label: string;
  iconName: string;
}

export default function UserPanel() {
  const navigate = useNavigate();
  const { menuItem } = useParams();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const { loginData, setLoginData, configs }: IContext = useContext(Context);

  const [itemMenuSelecionado, setItemMenuSelecionado] = useState<string>(menuItem || 'pedidos');

  //pedidos
  const [ordem, setOrdem] = useState<string>('desc');
  const [filtroPedidos, setFiltroPedidos] = useState<string>('');
  const [indexCarousel, setIndexCarousel] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidos, setPedidos] = useState<any>([]);
  const [detalhesPedidoSelecionado, setDetalhesPedidoSelecionado] = useState<any>();

  //alterar senha
  const [senhaAtual, setSenhaAtual] = useState<string>('');
  const [novaSenha, setNovaSenha] = useState<string>('');

  //dados login
  const [dadLogin, setDadLogin] = useState<ILoginData>(loginData);

  //Avaliação de produto
  const [indexItemPedido, setIndexItemPedido] = useState<number>(0);
  const [notaDeAvaliacao, setNotaDeAvaliacao] = useState<number>(0);
  const [detalheAvaliacao, setDetalheAvaliacao] = useState<string>('');

  //configs
  const [usaDadExtEnt, setUsaDadExtEnt] = useState<boolean>(false);

  const itensMenu: Record<string, JSX.Element> = {
    pedidos:
      <>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          swipeable={false}
          emulateTouch={false}
          infiniteLoop={false}
          showIndicators={false}
          autoPlay={false}
          selectedItem={indexCarousel}
          onChange={setIndexCarousel}
        >
          <>
            <FiltrosDiv>
              <input placeholder='Filtrar por código' value={filtroPedidos} onChange={(e) => setFiltroPedidos(e.target.value)} />
              <SelectInput
                value={ordem}
                onChange={setOrdem}
                options={[
                  { value: 'desc', text: 'Mais recente' },
                  { value: 'asc', text: 'Mais antigo' }
                ]}
              />
            </FiltrosDiv>
            <PedidosDiv>
              <TablePedidoTitleDiv>
                <span className='pedido'>Pedido</span>
                <span className='valor'>Valor</span>
                <span className='status'>Status</span>
                <span className='observação'>Observação</span>
                <span className='detalhes'></span>
              </TablePedidoTitleDiv>
              {pedidos.filter((pedido: any) => {
                if (filtroPedidos) {
                  if (pedido.cod.includes(filtroPedidos)) return true;
                  return false;
                }
                return true;
              }).map((pedido: any, index: number) => (
                <TablePedidoLinhaDiv key={index}>
                  <PedidoInfoDiv>
                    <span>{pedido.cod}</span>
                    <span>{formatarDataHora(pedido.dat)}</span>
                  </PedidoInfoDiv>
                  <PedidoValorDiv>
                    {formatCurrency(pedido.valPro)}
                  </PedidoValorDiv>
                  <PedidoStatusDiv>
                    <strong>{pedido.status}</strong>
                  </PedidoStatusDiv>
                  <PedidoObsDiv>
                    {pedido.obs}
                  </PedidoObsDiv>
                  <PedidoButtonDiv>
                    <Button onClick={() => {
                      setDetalhesPedidoSelecionado(pedido);
                      setIndexCarousel(1);
                    }}>
                      Detalhes
                    </Button>
                    {pedido.status === 'Pendente' &&
                      <Button
                        onClick={() => {
                          const link = pedido.obs.split('https://');
                          window.location.href = 'https://' + link[1];
                        }}
                      >
                        Pagar
                      </Button>
                    }
                  </PedidoButtonDiv>
                </TablePedidoLinhaDiv>
              ))}
            </PedidosDiv>
          </>
          <DetalhesPedidoDiv>
            {detalhesPedidoSelecionado &&
              <>
                {AvaliacaoModal()}
                <div id='pedido-pdf' style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong>Detalhes do Pedido {detalhesPedidoSelecionado.cod}</strong>
                  <span>{formatarDataHora(detalhesPedidoSelecionado.dat)}</span>
                  <DadosDiv>
                    <div>
                      <span><strong>Nome:</strong> {detalhesPedidoSelecionado.cliente.raz}</span>
                      <span><strong>CPF/CNPJ:</strong> {detalhesPedidoSelecionado.cliente.cgc}</span>
                    </div>
                    <div>
                      <span><strong>Email:</strong> {detalhesPedidoSelecionado.cliente.ema}</span>
                      <span><strong>Fone:</strong> {detalhesPedidoSelecionado.cliente.tel}</span>
                    </div>
                  </DadosDiv>
                  <DadosDiv>
                    <div>
                      <span><strong>Status:</strong> {detalhesPedidoSelecionado?.status}</span>
                    </div>
                    <div>
                      <span><strong>Forma de Pagamento:</strong> {detalhesPedidoSelecionado.forPag || 'Não disponível'}</span>
                    </div>
                    <div>
                      <span><strong>Forma de Entrega:</strong> {detalhesPedidoSelecionado.retloj === 1 ? 'Retirada' : 'Entrega Própria'}</span>
                      {detalhesPedidoSelecionado.retloj === 1 && <span>Pagamento na Retirada: {detalhesPedidoSelecionado.pagloj === 1 ? 'Sim' : 'Não'}</span>}
                    </div>
                    <div>
                      <span><strong>Endereço:</strong>
                        {detalhesPedidoSelecionado.cliente.endusu.log} {detalhesPedidoSelecionado.cliente.endusu.num} - {detalhesPedidoSelecionado.cliente.endusu.bai} - {detalhesPedidoSelecionado.cliente.endusu.cid} - {detalhesPedidoSelecionado.cliente.endusu.uf}, {detalhesPedidoSelecionado.cliente.endusu.cep}</span>
                    </div>
                    {usaDadExtEnt &&
                      <>
                        <div>
                          <span><strong>Data de Entrega:</strong> {detalhesPedidoSelecionado.datent}</span>
                          <span><strong>Destinatário:</strong> {detalhesPedidoSelecionado.quevairec}</span>
                          <span><strong>Fone:</strong> {detalhesPedidoSelecionado?.telquevairec || ''}</span>
                        </div>
                        <div>
                          <span><strong>Hora Inicial:</strong> {detalhesPedidoSelecionado.horini}</span>
                          <span><strong>Hora Final:</strong> {detalhesPedidoSelecionado.horfin}</span>
                        </div>
                        <div>
                          <span><strong>Mensagem do Cartão:</strong> {detalhesPedidoSelecionado?.men || ''}</span>
                        </div>
                      </>
                    }
                    <span><strong>Observação:</strong> {detalhesPedidoSelecionado.obs}</span>
                  </DadosDiv>
                  <br />
                  <strong>Produtos</strong>
                  <ProdutosDiv>
                    {detalhesPedidoSelecionado.itensPedido.map((item: any, index: number) => (
                      <ProdutosInfoDiv key={index}>
                        <span
                          onClick={() => navigate(`/productDetails/${item.codbar}/${item.mer.replaceAll(' ', '-')}`,
                            { state: { caminho: 'Home' } })
                          }
                        >
                          {item.qua}x {item.mer} {item?.codtam || ''} {item?.padmer || ''} {formatCurrency(item.valUni)}
                        </span>
                        {detalhesPedidoSelecionado?.status !== 'Pendente' &&
                          <p
                            onClick={() => {
                              setModalVisible(true);
                              setIndexItemPedido(index);
                            }}
                          >
                            Avaliar
                          </p>
                        }
                      </ProdutosInfoDiv>
                    ))}
                  </ProdutosDiv>
                  <DadosDiv>
                    <p><strong>Total Produtos:</strong> {formatCurrency(detalhesPedidoSelecionado.valPro - detalhesPedidoSelecionado.valFre)}</p>
                    <p><strong>Total Frete:</strong> {formatCurrency(detalhesPedidoSelecionado.valFre)}</p>
                    <p><strong>Valor Total: {formatCurrency(detalhesPedidoSelecionado.valPro)}</strong></p>
                  </DadosDiv>
                </div>
              </>
            }
            <DetalhesPedidoButtonsDiv>
              <span onClick={() => setIndexCarousel(0)}>Voltar</span>
              <Button onClick={() => gerarPDF(detalhesPedidoSelecionado.cod)}>
                Imprimir Recibo
              </Button>
              {detalhesPedidoSelecionado?.status === 'Pendente' &&
                <Button
                  onClick={() => {
                    const link = detalhesPedidoSelecionado.obs.split('https://');
                    window.location.href = 'https://' + link[1];
                  }}
                >
                  Finalizar Pedido
                </Button>
              }
            </DetalhesPedidoButtonsDiv>
          </DetalhesPedidoDiv>
        </Carousel>
      </>,
    alterarSenha:
      <>
        <AlterarSenhaForm onSubmit={alterarSenha}>
          <input
            placeholder='Senha atual'
            type='password'
            value={senhaAtual}
            onChange={(e: any) => {
              setSenhaAtual(e.target.value);
            }}
            hidden={senhaAtual.startsWith('alt1@@')}
          />
          <input
            placeholder='Nova senha'
            type='password'
            value={novaSenha}
            onChange={(e: any) => {
              setNovaSenha(e.target.value);
            }}
          />
          <Button type='submit'>Confirmar</Button>
        </AlterarSenhaForm>
      </>,
    cupons: <></>,
    dadosPessoais:
      <>
        <DadosPessoaisForm onSubmit={alterarDadosPessoais}>
          <input
            placeholder='Nome completo'
            value={dadLogin.raz ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDadLogin(prev => ({ ...prev, fan: e.target.value, raz: e.target.value }));
            }}
          />
          <input
            placeholder='CPF/CNPJ'
            value={dadLogin.cgc ?? ''}
            onChange={(e: any) => {
              if (e.target.value.length > 14) {
                setDadLogin(prev => ({ ...prev, cgc: cnpjMask(e.target.value) }));
                return;
              }
              setDadLogin(prev => ({ ...prev, cgc: cpfMask(e.target.value) }));
            }}
          />
          <input
            placeholder='Email'
            value={dadLogin.ema ?? ''}
            type='email'
            onChange={(e: any) => {
              setDadLogin(prev => ({ ...prev, ema: e.target.value, username: e.target.value }));
            }}
          />
          <input
            placeholder='Fone'
            value={dadLogin.fon ?? ''}
            onChange={(e: any) => {
              setDadLogin(prev => ({ ...prev, fon: e.target.value }));
            }}
          />
          <input
            placeholder='Data de nascimento'
            type='date'
            value={dadLogin.datnas ?? ''}
            onChange={(e: any) => {
              setDadLogin(prev => ({ ...prev, datnas: e.target.value }));
            }}
          />
          <Button type='submit'>Salvar Alterações</Button>
        </DadosPessoaisForm>
      </>,
    enderecosDeEntrega:
      <>
        {dadLogin.endUsu.sort((a: IUserAdress, b: IUserAdress) => b.padent - a.padent).map((endUsu: IUserAdress, index: number) => (
          <EnderecoDiv key={index}>
            {endUsu.padent === 1 && <strong>Endereço Padrão</strong>}
            <span>{endUsu.log}, {endUsu.num} - {endUsu.cep}</span>
            <span>{endUsu.bai}, {endUsu.cid} - {endUsu.uf}</span>
            {endUsu?.comlog && <span>{endUsu.comlog}</span>}
            {endUsu.padent !== 1 && <Button style={{ marginTop: 10 }} onClick={() => postEndereco(endUsu)}>Definir como padrão</Button>}
          </EnderecoDiv>
        ))}
      </>,
    privacidade: <></>,
  };

  async function getPedidos() {
    try {
      const response = await api.get(`/pedidos/listarPedidoPorCliente?nome=${loginData.username}`);

      if (response.status === 200) {
        setPedidos(response.data);
      }

    } catch (error: any) {
      toast.error('Falha ao buscar pedidos' + error.message);
    }
  }

  function limparAvaliacao() {
    setIndexItemPedido(0);
    setNotaDeAvaliacao(0);
    setDetalheAvaliacao('');
  }

  async function postAvaliacao() {
    try {
      if (notaDeAvaliacao === 0) {
        toast.warning('Faltou informar nota do produto.');
        return;
      }
      if (!detalhesPedidoSelecionado?.itensPedido[indexItemPedido]?.codmer) {
        toast.error('Falha ao obter código do produto.');
      }

      const payload = {
        des: notaDeAvaliacao > 2 ? 'Recomendo este produto' : 'Não recomendo este produto',
        det: detalheAvaliacao,
        pon: notaDeAvaliacao,
        mercador: {
          cod: detalhesPedidoSelecionado.itensPedido[indexItemPedido].codmer
        },
        appuser: {
          id: dadLogin.id
        }
      };

      const response = api.post('/avaliacoes/salvar', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if ((await response).status === 201) {
        limparAvaliacao();
        setModalVisible(false);
        toast.success('Avaliação foi salva com sucesso.');
      }
    } catch (error: any) {
      toast.error('Falha ao enviar avaliação. ' + error.message);
    }
  }

  async function postEndereco(endUsu: IUserAdress) {
    try {
      const payload = endUsu;
      payload['appuser'] = { id: loginData.id };

      const response = await api.post('/endusus/salvar', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('Endereço salvo');
      }
    } catch (error: any) {
      toast.error('Falha ao salvar endereço. ' + error.message);
    }
  }

  function AvaliacaoModal() {
    return (
      <>
        <ReactModal
          isOpen={modalVisible}
          appElement={document.getElementById('root') as HTMLElement}
          contentLabel='Minimal Modal Example'
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => {
            limparAvaliacao();
            setModalVisible(false);
          }}
          style={{
            overlay: {
              backgroundColor: '#1D1D1D',
              opacity: 1,
              zIndex: 99
            },
            content: {
              display: 'flex',
              height: 350,
              width: isMobile ? '80%' : '50%',
              margin: 'auto',
            },
          }}
        >
          <ModalDiv>
            <strong>{detalhesPedidoSelecionado.itensPedido[indexItemPedido].codbar} - {detalhesPedidoSelecionado.itensPedido[indexItemPedido].mer} {detalhesPedidoSelecionado.itensPedido[indexItemPedido]?.codtam || ''} {detalhesPedidoSelecionado.itensPedido[indexItemPedido]?.padmer || ''} 🤩</strong>
            <div>
              <span>Quantas estrelas eu mereço?</span>
              {[1, 2, 3, 4, 5].map((estrela: number) => {
                if (estrela <= notaDeAvaliacao) {
                  return <AiIcons.AiFillStar
                    key={estrela}
                    onClick={() => setNotaDeAvaliacao(estrela)}
                    color='yellow'
                    style={{ stroke: 'black', strokeWidth: 20, cursor: 'pointer' }}
                    size={20}
                  />;
                }
                return <AiIcons.AiOutlineStar
                  key={estrela}
                  onClick={() => setNotaDeAvaliacao(estrela)}
                  style={{ stroke: 'black', strokeWidth: 20, cursor: 'pointer' }}
                  size={20}
                />;
              })}
            </div>
            <textarea
              placeholder='Escreva algum detalhe.(opcional)'
              value={detalheAvaliacao}
              onChange={(e) => setDetalheAvaliacao(e.target.value)}
              maxLength={50}
              rows={4}
              cols={40}
            />
            <Button
              onClick={postAvaliacao}
            >
              Enviar
            </Button>
          </ModalDiv>
        </ReactModal>
      </>
    );
  }

  async function alterarSenha(e: any) {
    try {
      e.preventDefault();
      if (senhaAtual !== loginData.password) {
        toast.warning('Senha atual inválida');
        return;
      }
      if (!novaSenha) {
        toast.warning('Nova senha inválida');
        return;
      }

      const novoDadosLogin = loginData;
      novoDadosLogin.password = novaSenha;

      const response = await api.put('/usuarios/atualizar', novoDadosLogin, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setLoginData(novoDadosLogin);
        Cookies.remove('@loginData', { domain: window.location.hostname });
        Cookies.set('@loginData', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        toast.success('Nova senha foi salva com sucesso.');
      }

    } catch (error: any) {
      toast.error('Falha ao salvar alterações. ' + error.message);
    }
  }

  async function alterarDadosPessoais(e: any) {
    try {
      e.preventDefault();

      if (!dadLogin.fan || !dadLogin.raz) {
        toast.warning('Nome completo inválido');
        return;
      }
      if (!validaCpfCnpj(dadLogin.cgc ?? '')) {
        toast.warning('CPF/CNPJ inválido');
        return;
      }
      if (!validaEmail(dadLogin.ema ?? '')) {
        toast.warning('email inválido');
        return;
      }
      if (!dadLogin.fon) {
        toast.warning('Fone inválido');
        return;
      }

      const response = await api.put('/usuarios/atualizar', dadLogin, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setLoginData(dadLogin);
        Cookies.remove('@loginData', { domain: window.location.hostname });
        Cookies.set('@loginData', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        toast.success('Alterações salvas com sucesso.');
      }
    } catch (error: any) {
      toast.error('Falha ao salvar alterações. ' + error.message);
    }
  }

  function logout() {
    setLoginData({
      id: 0, endUsu: [], username: '',
      password: '', raz: '', ema: '',
    });
    Cookies.remove('@loginData', { domain: window.location.hostname });
    toast.success('Sessão encerrada');
    navigate('/');
  }

  function ButtonsMenu() {
    const menuOptions: IMenuOptions[] = [
      { name: 'pedidos', label: 'Meus Pedidos', iconName: 'FaShoppingBag' },
      { name: 'alterarSenha', label: 'Alterar Senha', iconName: 'FaLock' },
      { name: 'cupons', label: 'Cupons de Desconto', iconName: 'FaMoneyCheckAlt' },
      { name: 'dadosPessoais', label: 'Dados Pessoais', iconName: 'FaUserEdit' },
      { name: 'enderecosDeEntrega', label: 'Endereços de Entrega', iconName: 'FaMapMarkerAlt' },
      { name: 'privacidade', label: 'Privacidade de Dados', iconName: 'FaShieldAlt' },
    ];

    return (
      <>
        {menuOptions.map((menu: IMenuOptions, index: number) => (
          <MenuButtons
            key={index}
            onClick={() => {
              setItemMenuSelecionado(menu.name);
              navigate(`/userPanel/${menu.name}`);
              if (menu.name === 'pedidos') {
                setIndexCarousel(0);
              }
            }}
            active={itemMenuSelecionado === menu.name}
          >
            &nbsp;&nbsp;<DynamicIcon name={menu.iconName} size={20} />&nbsp;{menu.label}
          </MenuButtons>
        ))}
        <MenuButtons
          onClick={logout}>
          &nbsp;&nbsp;<DynamicIcon name={'FaArrowLeft'} size={20} />&nbsp;Sair
        </MenuButtons>
      </>
    );
  }

  useEffect(() => {
    if (loginData.id === 0) {
      toast.warn('Faça login para acessar o painel de usuário');
      navigate('/login');
      return;
    }

    if (loginData.password.startsWith('alt1@@')) {
      setSenhaAtual(loginData.password);
    }

    getPedidos();
  }, []);

  useEffect(() => {
    function sortPedidos() {
      setPedidos([...pedidos].sort((a, b) => {
        if (ordem === 'desc') {
          return +b.cod - +a.cod;
        }
        return +a.cod - +b.cod;
      }));
    }

    if (pedidos.length > 1) {
      sortPedidos();
    }
  }, [ordem]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: usaDadExtEnt }] = configs.filter((config: any) => config.con === 'UsaDadExtEnt');

      setUsaDadExtEnt(Boolean(+usaDadExtEnt));

    }
  }, [configs]);

  return (
    <Container>
      <TitleContainer>
        <span>Olá <strong>{loginData?.raz ?? ''}!!</strong> Acompanhe aqui seus pedidos e seus dados cadastrais.</span>
      </TitleContainer>
      <MenuContainer>
        <MenuButtonsContainer>
          <ButtonsMenu />
        </MenuButtonsContainer>
        <MenuInfoContainer>
          {itensMenu[itemMenuSelecionado]}
        </MenuInfoContainer>
      </MenuContainer>
    </Container>
  );
}
