import React, { useState } from 'react';
import * as IoIcons from 'react-icons/io';
import { DropdownContainer, DropdownMenu, DropdownMenuItem, DropdownToggle } from './styles';
import { useNavigate } from 'react-router-dom';

interface IAllCategoriesMenu {
  AllCategoriesMenu: any[];
}

export default function AllCategoriesMenu({ AllCategoriesMenu }: IAllCategoriesMenu) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownToggle><IoIcons.IoMdMenu size={25} className='hamburguer-menu' /></DropdownToggle>
      <DropdownMenu isOpen={isOpen}>
        {AllCategoriesMenu.map((item: any, index: number) => (
          <DropdownMenuItem key={index}>
            <p
              onClick={() => navigate(`/productList/secMer=${item?.secmer.replaceAll('/', ' - ')}`, { state: { caminho: 'Home > ' + item?.secmer.replaceAll('/', ' - '), linimaban: item?.linimaban } })}
            >
              {item?.secmer ?? ''}
            </p>
            <ul>
              {item?.subsec && item.subsec.map((subsec: any, i: number) => (
                <li key={i}
                  onClick={() => navigate(`/productList/subSecMer=${subsec?.subsec.replaceAll('/', ' - ')}`, { state: { caminho: 'Home > ' + subsec?.subsec.replaceAll('/', ' - '), linimaban: item?.linimaban } })}
                >
                  {subsec.subsec ?? ''}
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
}
