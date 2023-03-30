import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 25rem;
  margin: 2rem 0px;
`;

export const ImageDiv = styled.div`
  display: inline-block;
  width: 48%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  :hover {
    img{
      transform: scale(1.2);
      transform-origin: 50% 50%;
      filter: brightness(50%);
    }
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  transition: all ease-in-out 500ms;
`;
