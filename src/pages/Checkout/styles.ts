import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f7;

  .carousel {
    overflow: hidden;
  }

  .carousel.carousel-slider {
    border: none;
  }

  @media screen and (min-height: 900px){
    min-height: 100vh;
  }
`;

export const CarouselContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #000;
  width: 95%;
  align-self: center;

  h2 {
    margin: 2rem 0rem;
  }

  @media screen and (max-width: 767px){
    width: 100%;
    padding: 0px;
    border: none;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
  /* position : absolute; */
  bottom : 0;
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 500;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 767px){
    span {
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
`;

export const CheckBoxButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 450;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;

  input:nth-child( 2 ) {
    margin-left:10px;
  }
  input{
    height: 25px;
    width: 25px;
    background-color: #eee;
    margin-right: 10px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  span {
    color: red;
    opacity: 0.8;
    cursor: pointer;
  }

`;

export const MenuParalelo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;

  div:nth-child( 2 ) {
    margin-left:10px;
  }

  @media screen and (max-width: 767px) {
    width: 90%;
  }

`;

export const WrapInput = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid #adadad;
  margin-bottom: 37px;

  @media screen and (max-width: 767px) {
    width: 90%;
  }

    .input {
    font-size: 15px;
    color: #000;
    line-height: 1.2;
    border: none;
    display: block;
    width: 100%;
    height: 45px;
    background-color: #fff;
    padding: 0 5px;
    font-family: Nunito, sans-serif;
  }

  .focus-input {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    color: #adadad;
    font-family: Nunito, sans-serif;
  }

  .focus-input::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    background: #6a7dfe;
    background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
    background: -o-linear-gradient(to left, #21d4fd, #b721ff);
    background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
    background: linear-gradient(to left, #21d4fd, #b721ff);
  }

  .focus-input::after {
    font-family: Nunito, sans-serif;
    font-size: 15px;
    color: #000;
    line-height: 1.2;
    content: attr(data-placeholder);
    display: block;
    width: 100%;
    position: absolute;
    top: 16px;
    left: 0px;
    padding-left: 5px;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    text-align: left;
  }

  .input:focus {
    outline: 0;
  }

  .input:focus+.focus-input::after {
    top: -15px;
  }

  .input:focus+.focus-input::before {
    width: 100%;
  }

  .has-val+.focus-input::after {
    top: -15px;
  }

  .has-val+.focus-input::before {
    width: 100%;
  }
`;

export const Button = styled.button`
  color: #fff;
  /* width: 20%; */
  padding: 0px 20px;
  height: 2.5rem;
  background-color: #000;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :active {
    opacity: 0.6;
  }
`;

export const ProdutoDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* height: 6rem; */
  border-bottom: 1px solid #eee;
  background-color: #fff;

  img {
    height: 5rem;
    object-fit: contain;
  }
  span {
    width: 100%;
  }
  b {
    width: 100%;
  }
  @media screen and (max-width: 767px){
    font-size: 0.9rem;
    img {
      height: 3rem;
      object-fit: contain;
    }
  }
`;

export const TotaisDiv = styled.div`
  display:flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  span {
    font-size: 1.2rem;
  }

  b {
    font-size: 1.4rem;
  }
`;
