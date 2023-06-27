import React, { useEffect, useState, useContext } from 'react';
import {
  Button, Container, ContainerMobile, ColorDiv, ColorSizeDiv, ProductDescriptionDiv,
  DetailsDiv, SoldOutText, ShippingDiv, ShippingInput, ShippingInputDiv, ImageCarouselContainer,
  ImageCarouselDiv, NavDiv, NavCartDiv, ColorsPalletDiv,
  SizePalletDiv, PriceDiv, ProductInfoDiv, QuantityButton, QuantityInput,
  QuantityInputDiv,
  Ref, SizesDiv, Title
} from './styles';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import * as AiIcons from 'react-icons/ai';
import Footer from '../../components/Footer';
import * as FiIcons from 'react-icons/fi';
import Accordion from '../../components/Accordion';
import Colors from '../../components/Colors/Index';
import Tamanhos from '../../components/Tamanhos';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import Context, { ICart, IContext, ISelectedColor } from '../../context/Context';
import ProductDetailReview from '../../components/ProductDetailReview';
import useWindowDimensions from '../../utils/WindowDimensions';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { BuscaEndereco } from '../../utils/buscaCep';

export interface ICartItem {
  cod: number | undefined,
  codmer: number,
  codapp_user: number,
  qua: number
}

export async function saveCartItem({ cod, codmer, codapp_user, qua }: ICartItem) {
  try {
    const payload = { cod, codmer, codapp_user, qua };

    if (codapp_user === 0) return;

    const response = await api.post('/itecar/salvar', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    console.log('Failed to save cart item. ' + error.message);
  }
}

export async function deleteCartItem(cod: number | undefined) {
  try {
    if (!cod) return;
    await api.delete(`/itecar/delete?id=${cod}`);
  } catch (error: any) {
    console.log('Failed to delete cart item. ' + error.message);
  }
}

export default function ProductDetails() {
  // const location = useLocation();
  const { sku } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const skipTutorial = localStorage.getItem('@acessed');

  const {
    cart, setCart,
    configs, loginData
  }: IContext = useContext(Context);

  const [amount, setAmount] = useState<string>('1');
  const [selectedColor, setSelectedColor] = useState<ISelectedColor>({ cod: '', padmer: '', linkFot: '' });
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [pictures, setPictures] = useState<any>([]);
  const [productDetails, setProductDetails] = useState<any>([]);
  const [productDescription, setProductDescription] = useState<any>([]);

  const [sizes, setSizes] = useState<any>([]);
  const [colors, setColors] = useState<any>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const [runTutorial, setRunTutorial] = useState(false);

  //configs
  const [finishCartOnWhatsApp, setFinishCartOnWhatsApp] = useState<boolean>(false);
  const [maxInstallments, setMaxInstallments] = useState(1);
  const [minInstallmentPrice, setMinInstallmentPrice] = useState(1);
  const [keyApiGoo, setKeyApiGoo] = useState<string>('0');
  const [numCel, setNumCel] = useState<string>('');
  const [NecCadAutMosPro, setNecCadAutMosPro] = useState<boolean>(false);

  //frete
  const [deliveryFee, setDeliveryFee] = useState<undefined | number>();
  const [zipCode, setZipCode] = useState<string>('');

  const steps = [
    {
      target: '.WishListButton-step',
      content: 'Click here to save on wish list',
      disableBeacon: true,
      title: 'Im here to help you 😜',
    },
    {
      target: '.colors-step',
      content: 'Choose the color',
      disableBeacon: true,
      title: 'Available colors',
    },
    {
      target: '.sizes-step',
      content: 'Choose the size',
      disableBeacon: true,
      title: 'Available sizes',
    },
    {
      target: '.quantity-step',
      content: 'Enter the quantity',
      disableBeacon: true,
      title: 'Quantity',
    },
    {
      target: '.cartButton-step',
      content: 'After all , just click here',
      disableBeacon: true,
      title: 'Add to cart 👌',
    },
  ];

  async function getProductDetails(sku: string) {
    try {
      const response = await api.get(`/mercador/listarParaDetalhes?codbar=${sku}&CODTABPRE=0`);
      if (response.status === 200) {
        const tamanhosProd = response.data.tamanhos.map((tamanho: any) => {
          return { tamanho: tamanho, isSelected: false };
        });

        const coresProd = response.data.cores.map((cor: any) => {
          const corPorFoto = response.data.fotos.filter((foto: any) => foto.codpad === cor.cod);
          return { cod: cor.cod, padmer: cor.padmer, linkFot: corPorFoto[0]?.linkfot ? 'https://' + corPorFoto[0]?.linkfot : 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg', isSelected: false };
        });

        setSizes(tamanhosProd);
        setColors(coresProd);
        setPictures(response.data?.fotos);
        setProductDetails(response.data);
        setProductDescription([
          { titulo: 'Description', conteudo: response.data?.desSit }
        ]);
        setRunTutorial(true);
      }

    } catch (error: any) {
      toast.error('Failed to fetch product details ' + error.message);
    }
  }

  function quantityIncrement() {
    if (+amount <= 1) {
      return;
    }
    setAmount(prev => {
      return String(+prev - 1);
    });
  }

  function quantityDecrement() {
    setAmount(prev => {
      return String(+prev + 1);
    });
  }

  function changeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value >= 0) {
      setAmount(String(Math.round(+e.target.value)));
    }
  }

  async function addToCart({ codmer, codbar, mer, codtam, cor, quantidade, valor }: ICart) {
    const novoProduto: any = [{ codmer, codbar, mer, codtam, cor, quantidade, valor }];

    if (quantidade == '0') {
      toast.warning('Quantidade inválida');
      return;
    }
    if (!valor) {
      toast.warning('Preço do produto está inválido, entre em contato com a loja.');
      return;
    }

    if (productDetails?.tamanhos.length > 0 && !codtam) {
      toast.warning('Selecione o tamanho');
      return;
    }

    if (productDetails?.cores.length > 0 && !cor.cod) {
      toast.warning('Selecione a cor');
      return;
    }

    if (productDetails?.cores.length === 0) {
      novoProduto[0]['cor'] = {
        cod: '', padmer: 'ÚNICA',
        linkFot: pictures[0]?.linkfot ? 'https://' + pictures[0]?.linkfot : 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg'
      };
    }

    if (!codmer) {
      toast.error('Código do produto não encontrado');
      return;
    }

    const currentCart = cart;
    const [productAlreadyOnCart] = cart.filter((item: ICart) => item.codmer === codmer);

    if (productAlreadyOnCart) {
      const index = currentCart.indexOf(productAlreadyOnCart);
      currentCart[index]['quantidade'] = String(+(currentCart[index].quantidade) + Math.floor(+(quantidade)));
      const itemCarrinhoAtualizado = {
        cod: currentCart[index].cod, codmer: currentCart[index].codmer,
        codapp_user: loginData.id, qua: +currentCart[index].quantidade
      };

      saveCartItem(itemCarrinhoAtualizado);
      setCart(currentCart);
      // localStorage.setItem('@Carrinho', JSON.stringify(carrinhoAtual));
      toast.success(
        `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codtam ? '- ' + codtam.toUpperCase() : ''} has been added to cart`
      );
      return;
    }

    const newCartItem: ICartItem = { cod: undefined, codmer: novoProduto[0].codmer, codapp_user: loginData.id, qua: +novoProduto[0].quantidade };

    const savedCartItem = await saveCartItem(newCartItem);
    if (savedCartItem) {
      novoProduto[0]['cod'] = savedCartItem.cod;
    }

    setCart([...cart, ...novoProduto]);
    // localStorage.setItem('@Carrinho', JSON.stringify([...carrinho, ...novoProduto]));
    toast.success(
      `${quantidade}x ${mer.toUpperCase()} ${cor.padmer ? '- ' + cor.padmer.toUpperCase() : ''} ${codtam ? '- ' + codtam.toUpperCase() : ''} has been added to cart`
    );
  }

  function tutorialCallback(data: CallBackProps) {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTutorial(false);
      localStorage.setItem('@acessed', 'true');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function addToWishList() {
    try {
      if (loginData.id === 0) {
        toast.warning('Log in to manage your wishlist');
        navigate('/login');
        return;
      }

      const response = await api.get(`/itelisdes/listarPorUsuario?id=${loginData.id}`);
      let produtoJaEstaNaLista = [];

      if (response.data !== 'Product not found') {
        produtoJaEstaNaLista = response.data.content.filter((e: any) => e.codBar === sku);
      }

      if (produtoJaEstaNaLista.length > 0) {
        await api.delete(`/itelisdes/delete?id=${produtoJaEstaNaLista[0].codIteLisDes}`);
        toast.success(`${productDetails?.mer} has bem removed from wish list.`);
        return;
      }

      const payload = {
        codmer: productDetails.detalhes[0].codigo,
        codapp_user: loginData.id
      };

      await api.post('/itelisdes/salvar', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success(`${productDetails?.mer} has been added to your wish list.`);

    } catch (error: any) {
      toast.error('Failed to save item on your wish list. ' + error.message);
    }
  }

  //calcula frete viverde
  async function calculateShippingFee(endereco: any) {
    try {
      if (keyApiGoo !== '0') {
        const destino = endereco.log + ', ' +
          endereco.num + ' - ' + endereco.bai + ', ' + endereco.cid + ' - ' +
          endereco.uf + ', ' + endereco.cep;
        const response = await api.get(`/pedidos/CalcularDistanciaParaEntregar?destino=${destino}`);
        if (response.status === 200) {
          if (response.data.length > 0) {
            setDeliveryFee(+(response.data[0].valor.replace(',', '.')));
          }
        }
      }
    } catch (error: any) {
      toast.error('Failed to calculate shipping fee. ' + error.message);
    }
  }

  async function getZipCode() {
    setDeliveryFee(undefined);
    if (zipCode.length < 8) {
      toast.warning('Invalid zip code');
      return;
    }

    const dadosEndereco = await BuscaEndereco(zipCode);
    if (dadosEndereco) {
      calculateShippingFee({
        log: dadosEndereco.logradouro, num: '', bai: dadosEndereco.bairro,
        cid: dadosEndereco.localidade, uf: dadosEndereco.uf, cep: dadosEndereco.cep
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    getProductDetails(sku ?? '');
  }, []);

  useEffect(() => {
    if (productDetails?.fotos) {
      const fotosCorSelecionada = productDetails.fotos.filter((foto: any) => foto.codpad === selectedColor.cod);
      if (fotosCorSelecionada.length > 0) {
        setPictures(fotosCorSelecionada);
        setCarouselIndex(0);
        return;
      }
      setPictures([{
        codpad: selectedColor.cod, linkfot: 'darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg'
      }]);
      setCarouselIndex(0);
      return;
    }
  }, [selectedColor]);

  useEffect(() => {
    if (configs.length > 0) {
      const [{ val: talkToSeller }] = configs.filter((config: any) => config.con === 'botFalVen');
      const [{ val: maxInstallments }] = configs.filter((config: any) => config.con === 'quamaxpar');
      const [{ val: minInstallmentPrice }] = configs.filter((config: any) => config.con === 'valminpar');
      const [{ val: keyApiGoo }] = configs.filter((config: any) => config.con === 'KeyApiGoo');
      const [{ val: celNumber }] = configs.filter((config: any) => config.con === 'NumWha');
      const [{ val: AuthSeePrices }] = configs.filter((config: any) => config.con === 'NecCadAutMosPro');

      setFinishCartOnWhatsApp(Boolean(JSON.parse(talkToSeller ?? '0')));
      setMaxInstallments(maxInstallments);
      setMinInstallmentPrice(minInstallmentPrice);
      setKeyApiGoo(keyApiGoo);
      setNumCel(celNumber);
      setNecCadAutMosPro(Boolean(+AuthSeePrices));
    }
  }, [configs]);

  return (
    <>
      {!skipTutorial && <Joyride
        run={runTutorial}
        steps={steps}
        callback={tutorialCallback}
        continuous
        hideCloseButton
        showSkipButton
        disableScrolling={!isMobile}
        scrollOffset={70}
        locale={{
          back: 'Voltar', close: 'Fechar', last: 'Fechar',
          next: 'Próximo', open: 'Abrir caixa', skip: 'Pular'
        }}
        styles={{
          options: {
            primaryColor: '#000'
          }
        }}
      />}
      {!isMobile ?
        <Container>
          <DetailsDiv>
            <ImageCarouselDiv>
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={true}
                swipeable={true}
                emulateTouch={true}
                infiniteLoop
                selectedItem={carouselIndex}
                onChange={setCarouselIndex}
                thumbWidth={pictures.length < 10 ? 60 : 40}
              >
                {pictures.length > 0 && pictures.map((foto: any, index: number) => (
                  <ImageCarouselContainer key={index}>
                    <img
                      src={'https://' + foto.linkfot}
                    />
                  </ImageCarouselContainer>
                ))}
              </Carousel>
            </ImageCarouselDiv>
            <ProductInfoDiv>
              <NavDiv>
                {/* <span>{!location?.state?.caminho ? 'Home' : location?.state?.caminho}</span> */}
                <span onClick={() => navigate('/')}>{'Home'}</span>
                <Button className='WishListButton-step' onClick={addToWishList}>
                  Favoritar
                  <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
                </Button>
              </NavDiv>
              <hr />
              <Title>
                {productDetails?.mer ?? ''}
              </Title>
              <Ref>
                Ref: {sku ?? ''}
              </Ref>
              {productDetails.esgSit === 1 && <SoldOutText>Esgotado</SoldOutText>}
              {NecCadAutMosPro ?
                loginData.autverprosit === 1 ?
                  <PriceDiv>
                    <b>
                      {(productDetails?.valVenMin !== 0 && formatCurrency(productDetails?.valVenMin)) || ''}
                    </b>
                    {maxInstallments > 1 && (productDetails?.valVenMin / maxInstallments) >= minInstallmentPrice &&
                      <span>
                        {maxInstallments + ' x '}
                        {productDetails?.valVenMin && formatCurrency(productDetails?.valVenMin / maxInstallments)}
                      </span>
                    }
                  </PriceDiv> : <></> :
                <PriceDiv>
                  <b>
                    {(productDetails?.valVenMin !== 0 && formatCurrency(productDetails?.valVenMin)) || ''}
                  </b>
                  {maxInstallments > 1 && (productDetails?.valVenMin / maxInstallments) >= minInstallmentPrice &&
                    <span>
                      {maxInstallments + ' x '}
                      {productDetails?.valVenMin && formatCurrency(productDetails?.valVenMin / maxInstallments)}
                    </span>
                  }
                </PriceDiv>
              }
              <ColorSizeDiv>
                {colors.length > 0 &&
                  <ColorDiv className='colors-step'>
                    <span>Cor</span>
                    <ColorsPalletDiv>
                      <Colors setSelectedColor={setSelectedColor} ColorList={colors} />
                    </ColorsPalletDiv>
                  </ColorDiv>
                }
                {sizes.length > 0 &&
                  <SizesDiv className='sizes-step'>
                    <span>Tamanho</span>
                    <SizePalletDiv>
                      <Tamanhos setTamanhoSelecionado={setSelectedSize} tamanhosLista={sizes} />
                    </SizePalletDiv>
                  </SizesDiv>
                }
              </ColorSizeDiv>
              <hr />
              <NavCartDiv>
                <ShippingDiv>
                  <span>
                    CALCULE O FRETE E PRAZO DE ENTREGA
                  </span>
                  <ShippingInputDiv>
                    <>
                      <ShippingInput
                        placeholder='ZIP code'
                        value={zipCode} onChange={(e: any) => setZipCode(e.target.value.replace(/\D/g, ''))}
                        onBlur={(e: any) => {
                          if (e.target.value.replace(/\D/g, '').length !== 8) {
                            setZipCode('');
                          }
                        }} />
                      <FiIcons.FiSearch
                        color='#000'
                        style={{ cursor: 'pointer', width: '10%', height: '100%' }}
                        onClick={getZipCode}
                      />
                    </>
                    {deliveryFee && <strong>&nbsp;&nbsp;{formatCurrency(deliveryFee)}</strong>}
                  </ShippingInputDiv>
                </ShippingDiv>
                <QuantityInputDiv className='quantity-step'>
                  <QuantityButton
                    onClick={quantityIncrement}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type={'number'}
                    value={amount}
                    onChange={changeQuantity}
                  />
                  <QuantityButton
                    onClick={quantityDecrement}>
                    +
                  </QuantityButton>
                </QuantityInputDiv>
                <Button
                  backgroundColor={'#000'}
                  onClick={() => {

                    const codmer = productDetails?.detalhes.filter((produto: any) =>
                      produto.tamanho == selectedSize && (produto?.cor ? produto.cor === selectedColor.padmer : true)
                    );

                    addToCart({
                      codmer: codmer[0]?.codigo ?? '', codbar: productDetails?.codBar, mer: productDetails?.mer, codtam: selectedSize, cor: selectedColor,
                      quantidade: String(Math.floor(+amount)), valor: codmer[0]?.valor ?? 0
                    });
                  }}
                  className='cartButton-step'
                  disabled={Boolean(productDetails?.esgSit)}
                >
                  Add to Cart
                  <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} />
                </Button>
              </NavCartDiv>
              <hr />
              <ProductDescriptionDiv>
                {productDescription.length > 0 && productDescription.map((descricao: any, index: any) => (
                  <Accordion key={index} title={descricao.titulo} text={descricao.conteudo} />
                ))}
              </ProductDescriptionDiv>
              <hr />
              <ProductDetailReview sku={sku} />
            </ProductInfoDiv>
          </DetailsDiv >
        </Container > :
        <ContainerMobile>
          <div style={{ marginLeft: -10 }}>
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              swipeable={true}
              emulateTouch={true}
              infiniteLoop
              selectedItem={carouselIndex}
              onChange={setCarouselIndex}
            >
              {pictures.length > 0 && pictures.map((foto: any, index: number) => (
                <ImageCarouselContainer key={index}>
                  <img
                    src={'https://' + foto.linkfot}
                  />
                </ImageCarouselContainer>
              ))}
            </Carousel>
          </div>
          <NavDiv>
            <span onClick={() => navigate('/')}>{'Home'}</span>
            <Button className='WishListButton-step' onClick={addToWishList}>
              Favoritar
              <AiIcons.AiOutlineHeart style={{ marginLeft: 10 }} size={25} />
            </Button>
          </NavDiv>
          <hr />
          <Title>
            {productDetails?.mer ?? ''} {' '} {selectedColor?.padmer ?? ''}
          </Title>
          <Ref>
            Ref: {sku ?? ''}
          </Ref>
          {productDetails.esgSit === 1 && <SoldOutText>Esgotado</SoldOutText>}
          {NecCadAutMosPro ?
            loginData.autverprosit === 1 ?
              <PriceDiv>
                <b>
                  {(productDetails?.valVenMin !== 0 && formatCurrency(productDetails?.valVenMin)) || ''}
                </b>
                {maxInstallments > 1 && (productDetails?.valVenMin / maxInstallments) >= minInstallmentPrice &&
                  <span>
                    {maxInstallments + ' x '}
                    {productDetails?.valVenMin && formatCurrency(productDetails?.valVenMin / maxInstallments)}
                  </span>
                }
              </PriceDiv> : <></> :
            <PriceDiv>
              <b>
                {(productDetails?.valVenMin !== 0 && formatCurrency(productDetails?.valVenMin)) || ''}
              </b>
              {maxInstallments > 1 && (productDetails?.valVenMin / maxInstallments) >= minInstallmentPrice &&
                <span>
                  {maxInstallments + ' x '}
                  {productDetails?.valVenMin && formatCurrency(productDetails?.valVenMin / maxInstallments)}
                </span>
              }
            </PriceDiv>
          }
          <ColorSizeDiv isMobile={isMobile}>
            {colors.length > 0 && <ColorDiv className='colors-step'>
              <span>Cor</span>
              <ColorsPalletDiv>
                <Colors setSelectedColor={setSelectedColor} ColorList={colors} />
              </ColorsPalletDiv>
            </ColorDiv>
            }
            {sizes.length > 0 && <SizesDiv className='sizes-step'>
              <span>Tamanho</span>
              <SizePalletDiv>
                <Tamanhos setTamanhoSelecionado={setSelectedSize} tamanhosLista={sizes} />
              </SizePalletDiv>
            </SizesDiv>
            }
          </ColorSizeDiv>
          <hr />
          {!finishCartOnWhatsApp &&
            <>
              <br />
              <ShippingDiv>
                <span>
                  Calculate shipping
                </span>
                <ShippingInputDiv>
                  <>
                    <ShippingInput
                      placeholder='ZIP code'
                      value={zipCode} onChange={(e: any) => setZipCode(e.target.value.replace(/\D/g, ''))}
                      onBlur={(e: any) => {
                        if (e.target.value.replace(/\D/g, '').length !== 8) {
                          setZipCode('');
                        }
                      }} />
                    <FiIcons.FiSearch
                      color='#000'
                      style={{ cursor: 'pointer', width: '10%', height: '100%' }}
                      onClick={getZipCode}
                    />
                  </>
                  {deliveryFee && <strong>&nbsp;&nbsp;{formatCurrency(deliveryFee)}</strong>}
                </ShippingInputDiv>
              </ShippingDiv>
              <br />
              <hr />
            </>
          }
          <ProductDescriptionDiv>
            {productDescription.length > 0 && productDescription.map((descricao: any, index: any) => (
              <Accordion key={index} title={descricao.titulo} text={descricao.conteudo} />
            ))}
          </ProductDescriptionDiv>
          <NavCartDiv>
            <QuantityInputDiv className='quantity-step'>
              <QuantityButton
                onClick={quantityIncrement}
              >
                -
              </QuantityButton>
              <QuantityInput
                type={'number'}
                value={amount}
                onChange={changeQuantity}
              />
              <QuantityButton
                onClick={quantityDecrement}>
                +
              </QuantityButton>
            </QuantityInputDiv>
            <Button
              className='cartButton-step'
              backgroundColor={'#000'}
              onClick={() => {

                const codmer = productDetails?.detalhes.filter((produto: any) =>
                  produto.tamanho == selectedSize && (produto?.cor ? produto.cor === selectedColor.padmer : true)
                );

                addToCart({
                  codmer: codmer[0]?.codigo ?? '', codbar: productDetails?.codBar, mer: productDetails?.mer, codtam: selectedSize, cor: selectedColor,
                  quantidade: String(Math.floor(+amount)), valor: codmer[0]?.valor ?? 0
                });
              }}
              disabled={Boolean(productDetails?.esgSit)}
            >
              {isMobile ? 'Add to cart' : 'Add to cart'}
              <AiIcons.AiOutlineShoppingCart style={{ marginLeft: 10 }} size={25} /> :
            </Button>
          </NavCartDiv>
          <hr />
          <ProductDetailReview sku={sku} />
        </ContainerMobile>
      }
      <Footer />
    </>
  );
}
