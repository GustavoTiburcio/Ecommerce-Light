import React, { useState, useEffect } from 'react';
import { Tamanho } from './styles';

interface TamanhosProps {
  codbar?: string;
  setTamanhoSelecionado: any;
  tamanhosLista: string[];
}

export default function Tamanhos({ setTamanhoSelecionado, tamanhosLista }: TamanhosProps) {
  const [tamanhos, setTamanhos] = useState<any>([]);

  useEffect(()=>{
    setTamanhos(tamanhosLista);
  },[tamanhosLista]);

  return (
    <>
      {tamanhos.map((tamanho: any, index: number) => (
        <Tamanho
          key={index}
          selecionado={tamanho.isSelected}
          onClick={() => {
            const filtroTamanhos = tamanhos.map((tamanhoMarcado: any) => {
              if (tamanho.tamanho === tamanhoMarcado.tamanho) {
                return { tamanho: tamanhoMarcado.tamanho, isSelected: true };
              }
              return { tamanho: tamanhoMarcado.tamanho, isSelected: false };
            });
            setTamanhos(filtroTamanhos);
            setTamanhoSelecionado(tamanho.tamanho);
          }}
        >
          {tamanho.tamanho}
        </Tamanho>
      ))}
    </>
  );
}
