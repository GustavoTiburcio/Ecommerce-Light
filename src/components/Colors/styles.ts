import styled from 'styled-components';

interface ColorProps {
  backgroundImage?: string;
  selected: boolean;
}

export const ColorDiv = styled.div<ColorProps>`
  display: flex;

  height: 48px;
  width: 48px;
  background-image: ${({ backgroundImage }) => backgroundImage ? `URL(${backgroundImage})` : ''};
  background-size: cover;
  cursor: pointer;
  border: ${({ backgroundImage }) => backgroundImage ? '2px solid white;' : ''};
  opacity: ${({ selected }) => selected ? 1 : 0.7};
  ${({ selected }) => selected ? 'outline: 2px solid red;' : ''}

  span {
    width: 100%;
    height: 100%;
    font-size: 0.6rem;
    font-weight: bold;
    text-align:center;
    text-transform: uppercase;
    word-wrap: break-word;
    overflow: hidden;
  }
`;

export const CustomSelectContainerDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;

  span {
    margin-left: 10px;
  }
  p{
    color: grey;
  }
`;
