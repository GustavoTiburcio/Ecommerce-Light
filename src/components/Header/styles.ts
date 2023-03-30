import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 6rem;
  max-height: 180px;
  color: #fff;
  position: relative;
  z-index: 10;

  div:hover {
    background-color: #FFF;
    color: #000;
    a {
      color: #000;
    }
  }
`;

export const Subcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
`;

export const Logo = styled.img`
  cursor: pointer;
`;

export const Categorias = styled.div`
  align-items: center;
  width: 50%;
  flex-wrap: wrap;
  height: 100%;
  display: flex;
  flex-direction: row;
  text-transform: capitalize;
  font-weight: 500;
`;

export const Categoria = styled.p`
  margin-left: 10px;
  margin-right: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
    a {
      font-size: 2rem;
      background: none;
      color: #fff;
      margin: 0px 10px;
    }
    a:hover {
      color: #000
    }
`;
