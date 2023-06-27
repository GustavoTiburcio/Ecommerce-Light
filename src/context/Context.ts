import { createContext } from 'react';

export interface IContext {
  configs: any;
  setConfigs: (config: any) => void;
  rodape: IRodape[];
  setRodape: (rodape: IRodape[]) => void;
  carrinho: ICarrinho[];
  setCarrinho: (carrinho: ICarrinho[]) => void;
  dadosLogin: IDadosLogin;
  setDadosLogin: (dadosLogin: IDadosLogin) => void;
  listaDesejos: IListaDesejo[];
  setListaDesejos: (listaDesejos: IListaDesejo[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string;
  setError: (error: string) => void;
}

export interface IDadosLogin {
  id: number;
  datnas?: string;
  endUsu: IEndUsu[];
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

export interface ICarrinho {
  cod?: number;
  codmer: number;
  codbar: string;
  mer: string;
  codtam?: string;
  cor: ICorSelecionada;
  quantidade: string;
  valor: number
}

export interface IListaDesejo {
  cod: number | undefined;
  codmer: number;
  linkFot: string;
  mer: string;
  codbar: string;
  valVenMin: number;
}

export interface ICorSelecionada {
  cod: string;
  isSelected?: boolean;
  linkFot: string;
  padmer: string;
}

export interface IEndUsu {
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

export interface IRodape {
  cod: number;
  rod?: string;
  ord?: number;
  iterod: IItensRodape[];
}

export interface IItensRodape {
  cod: number;
  iterod?: string;
  ord?: number;
  perresiterod: IPerguntasRespostasItensRodape[];
}

export interface IPerguntasRespostasItensRodape {
  cod: number;
  per?: string;
  res?: string;
  ord?: number;
}

const Context = createContext<IContext>({});

export default Context;
