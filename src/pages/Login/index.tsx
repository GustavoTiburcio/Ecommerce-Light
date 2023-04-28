import React, { useEffect, useState, useContext } from 'react';
import {
  Anchor, Button, Container, GhostButton, Input, LeftOverlayPanel, Overlay,
  OverlayContainer, Paragraph, RightOverlayPanel, LoginContainer,
  CadastroContainer, Title, Form, LoginDiv, Logo
} from './styles';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface LoginProps {
  username: string;
  password: string;
  raz?: string;
  fan?: string;
  ema?: string;
  tipusu: 'comum';
}

export default function Login() {
  const navigate = useNavigate();
  const { configs, setDadosLogin }: any = useContext(Context);

  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [novoUsuario, setNovoUsuario] = useState<LoginProps>({ username: '', ema: '', password: '', raz: '', fan: '', tipusu: 'comum' });

  const [randomCadastroFrase, setRandomCadastroFrase] = useState('');
  const [randomLoginFrase, setRandomLoginFrase] = useState('');

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  const loginFrases = [
    'Sentiu minha falta né? 🥰',
    'Bom te ver por aqui 😜',
    'Tudo na paz? ✌',
    'Pode dar uma espiada nas novidades, eu deixo 😜',
    'Corre que tem promoção te esperando ✨',
    'Achou o que estava procurando? 👀',
    'Confia no pai que o seu pedido sai 😎'
  ];

  const cadastroFrases = [
    'É um prazer ter você conosco 💖',
    'Bom te ver por aqui 😜',
    'Corre que tem promoção te esperando ✨',
    'Tudo na paz? ✌',
    'Estava te esperando 👀',
    'Confia no pai que o seu pedido sai 😎'
  ];

  async function getLogin({ username, password }: LoginProps) {
    try {
      if (!username || !password) {
        toast.warning('Credenciais inválidas. Verique os campos digitados.');
        return;
      }

      const response = await api.get(`/usuarios/loginProvisorio?username=${username}&password=${password}`);

      if (response.status === 200) {
        if (response.data.length === 0) {
          throw Error('Usuário/Senha não encontrado.');
        }

        setDadosLogin(response.data);
        toast.success('Logado com sucesso.');
        navigate('/');
      }

    } catch (error: any) {
      toast.error('Falha no login. ' + error.message);
    }
  }

  async function postNovoCadastro(novoCadastro: LoginProps) {
    try {
      if (!novoCadastro.username || !novoCadastro.password || !novoCadastro.raz) {
        toast.warning('Credenciais inválidas. Verique os campos digitados.');
        return;
      }

      const response = await api.post('/usuarios/salvar', novoCadastro, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response?.status === 201) {
        setDadosLogin(response.data);
        toast.success('Usuário cadastrado com sucesso');
        navigate('/');
      }

    } catch (error: any) {
      toast.error('Falha ao cadastrar novo usuário. ' + error.message);
    }
  }

  useEffect(() => {
    setRandomCadastroFrase(cadastroFrases[(Math.random() * ((cadastroFrases.length - 1) - 0 + 1)) << 0]);
    setRandomLoginFrase(loginFrases[(Math.random() * ((loginFrases.length - 1) - 0 + 1)) << 0]);
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: uri }] = configs.filter((config: any) => config.gru === 'logo');
      setLogoURI('https://' + uri);
    }
  }, [configs]);

  return (
    <Container>
      <LoginDiv>
        <CadastroContainer login={login}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              postNovoCadastro(novoUsuario);
            }}
          >
            <Title>Criar Conta</Title>
            <Input type='text' placeholder='Nome'
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, fan: e.target.value, raz: e.target.value }))
              }
            />
            <Input type='email' placeholder='Email'
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, username: e.target.value, ema: e.target.value }))
              }
            />
            <Input type='password' placeholder='Senha'
              onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, password: e.target.value }))
              }
            />
            <Button>Cadastrar</Button>
          </Form>
        </CadastroContainer>
        <LoginContainer login={login}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              getLogin({ username, password: password, tipusu: 'comum' });
            }}
          >
            <Title>Vamos lá</Title>
            <Input type='email' placeholder='Email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
            <Input type='password' placeholder='Senha' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <Anchor href='/'>Esqueceu sua senha?</Anchor>
            <Button>Acessar</Button>
          </Form>
        </LoginContainer>

        <OverlayContainer login={login}>
          <Overlay login={login}>
            <LeftOverlayPanel login={login}>
              <Title>Seja Bem-vindo!</Title>
              <Paragraph>
                {randomCadastroFrase}
              </Paragraph>
              <GhostButton onClick={() => setLogin(true)}>
                Já tenho cadastro
              </GhostButton>
            </LeftOverlayPanel>

            <RightOverlayPanel login={login}>
              <Title>Bem-vindo de Volta!</Title>
              <Paragraph>
                {randomLoginFrase}
              </Paragraph>
              <GhostButton onClick={() => setLogin(false)}>
                Não tenho Conta
              </GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </LoginDiv>
      {logoURI && <Logo src={logoURI} alt="Logo" onClick={() => navigate('/')} />}
    </Container>
  );
}
