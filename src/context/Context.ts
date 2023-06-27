import { createContext } from 'react';

export interface IContext {
  configs: IConfigs[];
  setConfigs: (config: IConfigs[]) => void;
  footer: IFooter[];
  setFooter: (footer: IFooter[]) => void;
  cart: ICart[];
  setCart: (cart: ICart[]) => void;
  loginData: ILoginData;
  setLoginData: (loginData: ILoginData) => void;
  wishList: IWishList[];
  setWishList: (wishList: IWishList[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

export interface ILoginData {
  id: number;
  datnas?: string;
  endUsu: IUserAdress[];
  cpf?: string;
  username: string;
  password: string;
  idface?: string;
  raz: string;
  cgc?: string;
  fon?: string;
  ema: string;
  insest?: string;
  fan?: string;
  tipusu?: string;
  codtabpre?: number;
  codcat?: number;
  autverprosit?: number;
  codven?: number
}

export interface ICart {
  cod?: number;
  codmer: number;
  codbar: string;
  mer: string;
  codtam?: string;
  cor: ISelectedColor;
  quantidade: string;
  valor: number
}

export interface IWishList {
  cod: number | undefined;
  codmer: number;
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: number;
}

export interface ISelectedColor {
  cod: string;
  isSelected?: boolean;
  linkFot: string;
  padmer: string;
}

export interface IUserAdress {
  cod?: number;
  log: string;
  num: string;
  comlog?: string;
  bai: string;
  cep: string;
  cid: string;
  uf: string;
  codibg: number;
  padent: number
  appuser?: {
    id: number;
  }
}

export interface IFooter {
  id: number;
  title?: string;
  ord?: number;
  footerItens: IFooterItens[];
}

export interface IFooterItens {
  id: number;
  text?: string;
  ord?: number;
  footerSubItens: IFooterSubItens[];
}

export interface IFooterSubItens {
  id: number;
  question?: string;
  answer?: string;
  ord?: number;
}

export interface IConfigs {
  id: number
  config: string
  value: string
  description: string
}

const Context = createContext<IContext>({});

export default Context;
