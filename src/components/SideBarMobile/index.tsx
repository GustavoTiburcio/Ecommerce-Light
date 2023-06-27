import React, { useState } from 'react';
import { CloseIconDiv, Container } from './styles';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

interface SideBarMobileProps {
  todasCategorias: {
    codsecmer: string;
    secmer: string;
  }[]
  itensMenu: {
    codsecmer: string;
    secmer: string;
    parametros?: string;
    subsec: {
      filhos?: [],
      codsubsec: string;
      subsec: string;
    }[]
  }[]
}

export default function SideBarMobile({ todasCategorias, itensMenu }: SideBarMobileProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleItemClick = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <Container>
      <div onClick={handleToggle}>
        <FaIcons.FaBars size={20} />
      </div>
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <CloseIconDiv onClick={handleToggle}>
          <FaIcons.FaWindowClose size={25} />
        </CloseIconDiv>
        <ul>
          <li onClick={() => handleItemClick(9999)} className={activeIndex === 9999 ? 'active' : ''}>
            <b>Todas as Categorias</b>
            {activeIndex === 9999 && (
              <ul>
                {todasCategorias.map((categoria: any, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/productList/secMer=${categoria?.secmer.replaceAll('/', ' - ')}`, { state: { caminho: 'Home > ' + categoria?.secmer.replaceAll('/', ' - '), linimaban: categoria?.linimaban } });
                      handleToggle();
                    }}
                  >
                    - {categoria.secmer}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {itensMenu.map((itemMenu: any, index) => (
            <li
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => {
                if (itemMenu.subsec.length === 0) {
                  navigate(`/productList/itemMenu=${itemMenu?.parametros.replaceAll('=', ':')}`, { state: { caminho: 'Home > ' + itemMenu?.secmer.replaceAll('/', ' - '), linimaban: itemMenu?.linimaban } });
                  handleToggle();
                  return;
                }
                handleItemClick(index);
              }}
            >
              {itemMenu.secmer}
              {itemMenu.subsec && activeIndex === index && (
                <ul>
                  {itemMenu.subsec.map((subSec: any, index: any) => (
                    <li
                      key={index}
                      onClick={() => {
                        navigate(`/productList/itemMenu=${subSec?.parametros.replaceAll('=', ':')}`, { state: { caminho: 'Home > ' + itemMenu?.secmer.replaceAll('/', ' - ') + ' > ' + subSec?.subsec, linimaban: itemMenu?.linimaban } });
                        handleToggle();
                      }}
                    >
                      - {subSec.subsec}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
