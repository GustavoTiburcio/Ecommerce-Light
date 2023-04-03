import React, { useState } from 'react';
import { Tamanho } from './styles';

interface TamanhosProps {
  codbar?: string;
  setTamanhoSelecionado: any;
}

export default function Tamanhos({ setTamanhoSelecionado }: TamanhosProps) {
  const [tamanhos, setTamanhos] = useState([
    { cod: 1, tamanho: 'P', isSelected: false },
    { cod: 2, tamanho: 'M', isSelected: false },
    { cod: 3, tamanho: 'G', isSelected: false },
    { cod: 4, tamanho: 'GG', isSelected: false },
  ]);

  return (
    <>
      {tamanhos.map((tamanho: any, index: number) => (
        <Tamanho
          key={index}
          selecionado={tamanho.isSelected}
          onClick={() => {
            const filtroTamanhos = tamanhos.map((tamanhoMarcado: any) => {
              if (tamanho.tamanho === tamanhoMarcado.tamanho) {
                return { cod: tamanhoMarcado.cod, tamanho: tamanhoMarcado.tamanho, isSelected: true };
              }
              return { cod: tamanhoMarcado.cod, tamanho: tamanhoMarcado.tamanho, isSelected: false };
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
