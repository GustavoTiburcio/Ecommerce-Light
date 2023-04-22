import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 2rem 0px;
  background-color: #F7F7F7;
  overflow: hidden;

  p {
    font-size: 2.5rem;
    font-weight: bold;
    font-style: italic;
  }

  /* .carousel-wrapper{
    max-width: 100%;
  } */

  .control-next.control-arrow:before {
    content: '';
    border: solid #000;
    border-width: 0 8px 8px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    margin-right: 4rem;
  }

  .control-prev.control-arrow:before {
    content: '';
    border: solid #000;
    border-width: 0 8px 8px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    margin-left: 4rem;
  }

  @media screen and (max-width: 767px){
    height: 70vh;

    p {
      font-size: 1.5rem;
    }
  }

`;

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  height: 700px;
  width: 90%;
  margin-left: 5%;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;

  @media screen and (max-width: 767px){
    height: 450px;
    width: 90%;
    margin-left: 5%;
    flex-wrap: nowrap;
    column-gap: 10px;
  }
`;

