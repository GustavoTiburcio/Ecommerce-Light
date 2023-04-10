import styled from 'styled-components';

export const Container = styled.div`
  .nav-menu {
    background-color: #fff;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 450ms;
    z-index: 8;
  }

`;

export const MenuItems = styled.ul`
  width: 100%;

  .nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
    border-bottom: 0.5px solid rgba(5, 5, 5, 0.4)
  }

  .nav-text a {
    text-decoration: none;
    color: #FFF;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  span {
    margin-left: 16px;
  }

`;

export const Item = styled.li`
    background-color: #fff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .menu-bars {
    margin-left: 3rem;
    font-size: 2.5rem;
    background: none;
    color: #FFF;
  }
`;
