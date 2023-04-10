import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { Container, MenuItems, Item } from './styles';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function SideBar({ showSideBar, setShowSideBar }: any) {
  const navigate = useNavigate();

  return (
    <>
      <IconContext.Provider value={{ color: 'undefined' }}>
        <Container>
          <nav className={showSideBar ? 'nav-menu active' : 'nav-menu'}>
            <MenuItems onClick={()=> setShowSideBar(false)}>
              <Item>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </Item>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path !== '/' ? item.path : ''} onClick={() => {
                      if (item.path === '/') {
                        localStorage.removeItem('410cd9f5-f296-4eb8-a3bc-1e764c8f3e73');
                        toast.success('Sessão encerrada.');
                        navigate(item.path);
                      }
                    }}>
                      {item.icon}
                      <span>
                        {item.title}
                      </span>
                    </Link>
                  </li>

                );
              })}
            </MenuItems>
          </nav>
        </Container>
      </IconContext.Provider>
    </>
  );
}

