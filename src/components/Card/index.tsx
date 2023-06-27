import React, { useState, useEffect, useContext } from 'react';
import { CardContainer, CardImage, SoldOutText, TextDiv } from './styles';
import { useLocation, useNavigate } from 'react-router';
import Context, { IConfigs, IContext } from '../../context/Context';
import { formatCurrency } from '../../utils/formatCurrency';

interface CardProps {
  imageSrc: string;
  name: string;
  sku: string;
  price: number;
  soldOut?: boolean;
}

export default function Card({ imageSrc, name, sku, price, soldOut }: CardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { configs, loginData }: IContext = useContext(Context);

  const [cardImageOrientation, setCardImageOrientation] = useState('');
  const [maxInstallments, setMaxInstallments] = useState(1);
  const [minInstallmentPrice, setMinInstallmentPrice] = useState(1);
  const [authSeePrices, setAuthSeePrices] = useState<boolean>(false);
  const [showSku, setShowSku] = useState<boolean>(false);

  function Price() {
    if (authSeePrices) {
      if (!loginData.autverprosit) {
        return <></>;
      }
    }
    return (
      <>
        <span>{formatCurrency(price)}</span>
        {
          maxInstallments > 0 && (price / maxInstallments) >= minInstallmentPrice ?
            <b>{maxInstallments}x de {formatCurrency(price / maxInstallments)}</b> :
            <b>1x de {formatCurrency(price)}</b>
        }
      </>
    );
  }

  useEffect(() => {
    if (configs.length > 0) {
      const [{ value: imageOrientation }] = configs.filter((config: IConfigs) => config.config === 'imageOrientation');
      const [{ value: maxInstallments }] = configs.filter((config: IConfigs) => config.config === 'maxInstallments');
      const [{ value: minInstallmentPrice }] = configs.filter((config: IConfigs) => config.config === 'minInstallmentPrice');
      const [{ value: AuthSeePrices }] = configs.filter((config: IConfigs) => config.config === 'needAuthToSeePrices');
      const [{ value: CodBarCar }] = configs.filter((config: IConfigs) => config.config === 'showSkuInCard');

      setCardImageOrientation(imageOrientation.toLowerCase());
      setMaxInstallments(+maxInstallments);
      setMinInstallmentPrice(+minInstallmentPrice);
      setAuthSeePrices(Boolean(+AuthSeePrices));
      setShowSku(Boolean(+CodBarCar));
    }
  }, [configs]);

  return (
    <>
      <CardContainer
        imageOrientation={cardImageOrientation}
        onClick={() => navigate(`/productDetails/${sku}/${name.replaceAll(' ', '-')}`, { state: { caminho: location.state?.caminho } })}
      >
        <CardImage src={imageSrc} />
        <TextDiv>
          {(showSku || authSeePrices) && <span>{sku}</span>}
          <span className='productName'>{name}</span>
          <Price />
          {soldOut &&
            <SoldOutText>
              Esgotado
            </SoldOutText>
          }
        </TextDiv>
      </CardContainer >
    </>
  );
}
