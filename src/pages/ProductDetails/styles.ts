import styled from 'styled-components';

interface ButtonProps {
  backgroundColor?: string;
  isMobile?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  hr {
    border-width: 1px;
    color: #eee;
    opacity: 0.3;
  }
`;

export const DetailsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #fff;
`;

export const ImageCarouselDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15px;
  width: 40%;
  overflow-x: hidden;

  @media screen and (max-width: 1700px){
    width: 35%;
  }

  .control-next.control-arrow:before {
      content: '';
      border: solid #000;
      border-width: 0 8px 8px 0;
      display: inline-block;
      padding: 10px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      margin-right: 1rem;
    }

  .control-prev.control-arrow:before {
    content: '';
    border: solid #000;
    border-width: 0 8px 8px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    margin-left: 1rem;
  }
`;

export const ImageCarouselContainer = styled.div`
  margin-top: 10%;
  img {
    max-width: 592px;
  }
`;

export const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 58%;
  height: 100%;
  color: #000;
`;

export const NavDiv = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 450;
    font-size: 1.1rem;
    cursor: pointer;
  }

  span:hover{
    opacity: 0.7;
  }
`;

export const NavCartDiv = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button<ButtonProps>`
  color: #fff;
  /* width: 20%; */
  padding: 0px 20px;
  height: 2.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#555555'};
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 450;

  :active {
    opacity: 0.6;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Title = styled.span`
  color: #333;
  font-weight: 450;
  font-size: 1.5rem;
  margin-top: 1rem;
  text-transform: capitalize;
`;

export const Ref = styled.span`
  color: grey;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

export const PriceDiv = styled.div`
 display: flex;
 align-items: center;
 width: 50%;
 margin: 1rem 0px;

 b {
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
 }
 span {
  color: grey;
  font-size: 1.5rem;
  margin-left: 5rem;
  font-weight: bold;
 }
`;

export const ColorSizeDiv = styled.div<ButtonProps>`
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'row'};
  height: 6rem;
  margin: 1rem 0px;

  span {
    font-size: 1.1rem;
    font-weight: 450;
  }

`;

export const ColorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 47.5%;

  @media screen and (max-width: 767px){
    width: 100%;
  }
`;

export const ColorsPalletDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  column-gap: 10px;
  row-gap: 5px;
`;

export const SizesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  width: 47.5%;

  @media screen and (max-width: 767px){
    width: 100%;
  }
`;

export const SizePalletDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  column-gap: 10px;
  row-gap: 5px;
`;

export const ShippingDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShippingInput = styled.input`
  background: transparent;
  padding: 10px 5px;
  width: 50%;
  font-weight: bold;
  font-size: 1rem;
  border-width: 0 0 2px;

  ::placeholder {
    font-weight: bold;
    opacity: 0.8;
    font-size: 1rem;
  }

  :focus {
    outline: none;
  }
`;

export const ShippingInputDiv = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;

  strong {
    color: red;
  }
`;


export const ProductDescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0px;;
`;

export const QuantityInputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const QuantityButton = styled.button`
 width: 48px;
 height: 48px;
 margin: 0px 10px;
 font-size: 1.1rem;
font-weight: 450;
`;

export const QuantityInput = styled.input`
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 450;
  appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

`;

export const CustomSelectContainerDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 36;

  span {
    margin-left: 10px;
  }
  p{
    color: grey;
  }
`;

export const ContainerMobile = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    hr {
      border-width: 1px;
      color: #eee;
      opacity: 0.3;
      margin-left: -10px;
    }
`;

export const SoldOutText = styled.b`
  color: red;
`;
