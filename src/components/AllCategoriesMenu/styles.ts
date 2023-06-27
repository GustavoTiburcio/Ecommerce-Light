import styled from 'styled-components';

interface IMenuTodasCategorias {
  isOpen: boolean;
}

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownToggle = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  cursor: pointer;
`;

export const DropdownMenu = styled.div<IMenuTodasCategorias>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  display: ${({ isOpen }) => (isOpen ? 'flex' : '')};;
  flex-wrap: wrap;
  width: 70rem;

  @media screen and (max-width: 1024px){
    width: 40rem;
    font-size: 0.8rem;
  }

`;

export const DropdownMenuItem = styled.div`
  padding: 5px;
  position: relative;
  flex: 0 0 auto;
  width: 25%;

  :hover {
    p{
      color: red;
    }

    p:hover{
      color: red;
      cursor: pointer;
    }
  }

  li {
    list-style: none;
    font-weight: 400;
  }

  li:hover{
    color: red;
    cursor: pointer;
  }
`;
