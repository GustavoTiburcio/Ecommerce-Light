import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Menu Inicial',
    path: '/inicio',
    cName: 'nav-text',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Painel de Usuário',
    path: '/user',
    cName: 'nav-text',
    icon: <FaIcons.FaUserCircle />,
  },
  {
    title: 'Funcionários',
    path: '/funcionarios',
    cName: 'nav-text',
    icon: <IoIcons.IoMdPerson />,
  },
  // {
  //   title: 'Compradores',
  //   path: '/compradores',
  //   cName: 'nav-text',
  //   icon: <IoIcons.IoMdPerson />,
  // },
  {
    title: 'Informar Venda',
    path: '/saidaveiculo',
    cName: 'nav-text',
    icon: <FaIcons.FaChartLine />,
  },
  {
    title: 'Veículos Vendidos',
    path: '/veiculos',
    cName: 'nav-text',
    icon: <IoIcons.IoMdCar />,
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    cName: 'nav-text',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'Ajuda',
    path: '/ajuda',
    cName: 'nav-text',
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: 'Encerrar sessão',
    path: '/',
    cName: 'nav-text',
    icon: <IoIcons.IoMdLogOut />,
  }
];
