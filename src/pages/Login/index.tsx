import React, { useEffect, useState, useContext } from 'react';
import {
  Anchor, Button, Container, GhostButton, Input, LeftOverlayPanel, Overlay,
  OverlayContainer, Paragraph, RightOverlayPanel, LoginContainer,
  CadastroContainer, Title, Form, LoginDiv, Logo, RedefinirPasswordContainer
} from './styles';
import { useNavigate } from 'react-router';
import Context, { IConfigs } from '../../context/Context';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Cookies from 'js-cookie';

interface LoginProps {
  username: string;
  password: string;
  raz?: string;
  fan?: string;
  cgc?: string;
  ema: string;
  tipusu: 'comum';
}

export default function Login() {
  const navigate = useNavigate();
  const { configs, setDadosLogin }: any = useContext(Context);

  const [login, setLogin] = useState(true);
  const [redefinirPassword, setRedefinirPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [novoUsuario, setNovoUsuario] = useState<LoginProps>({ username: '', ema: '', password: '', raz: '', fan: '', cgc: '', tipusu: 'comum' });

  const [randomCadastroFrase, setRandomCadastroFrase] = useState('');
  const [randomLoginFrase, setRandomLoginFrase] = useState('');

  //config
  const [logoURI, setLogoURI] = useState<string>('');

  const frases = [
    'Sentiu minha falta né? 🥰',
    'Bom te ver por aqui 😜',
    'Tudo na paz? ✌',
    'Pode dar uma espiada nas novidades, eu deixo 😜',
    'Corre que tem promoção te esperando ✨',
    'Achou o que estava procurando? 👀',
    'É um prazer ter você conosco 💖',
    'Estava te esperando 👀',
    'Que tal uma dose de felicidade hoje? 😃',
    'Você é sempre bem-vindo(a) por aqui! 🤗',
    'Prepare-se para uma experiência incrível! 🌟',
    'Vamos começar com o pé direito? 👣',
    'Seja bem-vindo(a) de volta! 🎉',
    'Está pronto(a) para se surpreender? 🤩',
    'Nós sentimos sua falta! ❤️',
    'Pronto(a) para explorar novidades? 🚀',
  ];

  async function getLogin({ ema, password }: LoginProps) {
    try {
      if (!ema || !password) {
        toast.warning('Credenciais inválidas. Verique os campos digitados.');
        return;
      }

      const response = await api.get(`/usuarios/loginProvisorio?email=${ema}&password=${password}`);

      if (response.status === 200) {
        if (response.data.length === 0) {
          throw Error('Usuário/Senha não encontrado.');
        }
        const dadLogin = response.data;

        setDadosLogin(response.data);
        Cookies.set('@loginData', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        if (password.startsWith('alt1@@')) {
          toast.success('Feliz em ter você de volta 🤩 Altere já a senha da sua conta no painel de usuário.');
          navigate('/userPanel/alterarSenha');
          return;
        }
        toast.success(`Bem-vindo ${dadLogin.raz ?? ''}!! Fique a vontade 😉`);
        navigate('/');
      }

    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error('Usuario e/ou senha inválidos.');
        return;
      }
      toast.error('Falha no login. ' + error.message);
    }
  }

  async function postNovoCadastro(novoCadastro: LoginProps) {
    try {
      if (!novoCadastro.ema || !novoCadastro.password || !novoCadastro.raz) {
        toast.warning('Dados inválidos. Verique os campos digitados.');
        return;
      }

      const response = await api.post('/usuarios/salvar', novoCadastro, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response?.status === 201) {
        const dadLogin = response.data;

        setDadosLogin(response.data);
        Cookies.set('@loginData', JSON.stringify(dadLogin), { expires: 7, domain: window.location.hostname });
        toast.success('Usuário cadastrado com sucesso');
        navigate('/');
      }

    } catch (error: any) {
      toast.error('Falha ao cadastrar novo usuário. ' + error.message);
    }
  }

  async function postRedefinirPassword(email: string) {
    try {
      if (!email) {
        toast.warning('Email inválido');
        return;
      }

      const response = await api.post(`/usuarios/resetPassword?email=${email}`);

      if (response.status === 200) {
        toast.success(response.data);
        setRedefinirPassword(false);
      }
    } catch (error: any) {
      toast.error('Falha ao solicitar redefinição de senha. ' + error.message);
    }
  }

  useEffect(() => {
    setRandomCadastroFrase(frases[(Math.random() * ((frases.length - 1) - 0 + 1)) << 0]);
    setRandomLoginFrase(frases[(Math.random() * ((frases.length - 1) - 0 + 1)) << 0]);
  }, []);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: uri }] = configs.filter((config: IConfigs) => config.config === 'logo');

      setLogoURI(uri);
    }
  }, [configs]);

  return (
    <Container>
      <LoginDiv>
        {!redefinirPassword ?
          <>
            <CadastroContainer login={login}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  postNovoCadastro(novoUsuario);
                }}
              >
                <Title>Criar Conta</Title>
                <Input type='text' required placeholder={'Full Name'}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, fan: e.target.value, raz: e.target.value }))
                  }
                />
                <Input type='email' placeholder='Email' required
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setNovoUsuario(prev => ({ ...prev, username: e.target.value, ema: e.target.value }))
                  }
                />
                <Input type='password' placeholder='Senha' required
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
                  getLogin({ ema: email, username: email, password: password, tipusu: 'comum' });
                }}
              >
                <Title>Vamos lá</Title>
                <Input type='email' placeholder='Email' value={email} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <Input type='password' placeholder='Senha' value={password} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <Anchor onClick={() => setRedefinirPassword(true)}>Esqueceu sua senha?</Anchor>
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
          </> :
          <RedefinirPasswordContainer>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                postRedefinirPassword(email);
              }}
            >
              <Title>Recuperação de conta</Title>
              <Input type='email' placeholder='Digite seu email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
              <Button>Enviar email</Button>
              <Anchor onClick={() => setRedefinirPassword(false)}>Acessar conta</Anchor>
            </Form>
          </RedefinirPasswordContainer>
        }
      </LoginDiv>
      {logoURI && <Logo src={logoURI} alt="Logo" onClick={() => navigate('/')} />}
    </Container>
  );
}
