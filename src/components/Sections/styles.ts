import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  height: 25rem;
  margin: 2rem 0px;
  overflow: hidden;
`;

export const SectionImageDiv = styled.div`
  display: inline-block;
  width: 23%;
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
    visibility: hidden;
  }

  img:hover {
      transform: scale(1.2);
      transform-origin: 50% 50%;
      filter: brightness(50%);
      /* p {
        font-size: 1.5rem;
        font-style: italic;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        visibility: visible;
      } */
  }
`;

export const SectionImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    transition: all ease-in-out 500ms;
`;

