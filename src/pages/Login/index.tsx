import React, { useEffect, useState, useContext } from 'react';
import {
  Anchor, Button, Container, GhostButton, Input, LeftOverlayPanel, Overlay,
  OverlayContainer, Paragraph, RightOverlayPanel, LoginContainer,
  CadastroContainer, Title, Form, LoginDiv, Logo
} from './styles';
import { useNavigate } from 'react-router';
import Context from '../../context/Context';

export default function Login() {
  const navigate = useNavigate();
  const { configs }: any = useContext(Context);

  const [login, setLogin] = useState(true);
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
          <Form onSubmit={() => navigate('/')}>
            <Title>Criar Conta</Title>
            <Input type='text' placeholder='Nome' />
            <Input type='email' placeholder='Email' />
            <Input type='password' placeholder='Senha' />
            <Button>Cadastrar</Button>
          </Form>
        </CadastroContainer>
        <LoginContainer login={login}>
          <Form onSubmit={() => navigate('/')}>
            <Title>Vamos lá</Title>
            <Input type='email' placeholder='Email' />
            <Input type='password' placeholder='Senha' />
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
