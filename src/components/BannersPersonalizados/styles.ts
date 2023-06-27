import styled from 'styled-components';

interface IBannersPersonalizados {
  width: number;
  hoverText: boolean;
  hover: boolean;
}

interface IContainer {
  display?: 'none';
}

export const Container = styled.div<IContainer>`
  display: ${({ display }) => display ? display : 'flex'};
  flex-direction: column;
  justify-content: space-evenly;
  width: 80%;
  margin: 2rem 0px;

  @media screen and (max-width: 767px){
    width: 95%;
    margin: 1rem 0px;
  }
`;

export const ContainerBanners = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0px;

  @media screen and (max-width: 767px){
    margin: 1rem 0px;
  }
`;

export const ContainerImage = styled.div<IBannersPersonalizados>`
  width: ${({ width }) => `${width}%`};
  display: inline-block;
  overflow: hidden;
  position: relative;

  p {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all ease-in-out 200ms;;
    visibility: hidden;
  }

  ${({ hover, hoverText }) => hover && hoverText ? `:hover {
    p {
      visibility: visible;
    }

    img{
      transform: scale(1.2);
      transform-origin: 50% 50%;
      filter: brightness(50%);
    }
  }` : null}

  ${({ hover }) => hover ? `:hover {
    img{
      transform: scale(1.2);
      transform-origin: 50% 50%;
    }
  }` : null}

  @media screen and (max-width: 767px) {
    pointer-events: none;

    ${({ hover, hoverText }) => hover && hoverText ? `
      p {
        visibility: visible;
        font-size: 0.6rem;
        text-align: center;
      }

      img{
        transform: scale(1.2);
        transform-origin: 50% 50%;
        filter: brightness(50%);
      }
    `: null}
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  transition: all ease-in-out 500ms;

  @media screen and (max-width: 767px){
  }
`;
