import React, { useState } from 'react';
import { CorDiv } from './styles';

interface CoresProps {
  codbar?: string;
  setCorSelecionada: any;
}

export default function Cores({ setCorSelecionada }: CoresProps) {
  const [cores, setCores] = useState([
    { cod: 1, nome: 'cinza', cor: 'grey', isSelected: false },
    { cod: 2, nome: 'azul', cor: 'blue', isSelected: false },
    { cod: 3, nome: 'ciano', cor: 'cyan', isSelected: false },
  ]);

  return (
    <>
      {cores.map((cor: any, index: number) => (
        <CorDiv
          key={index}
          backgroundColor={cor.cor}
          selecionado={cor.isSelected}
          onClick={() => {
            const filtroCores = cores.map(corMarcada => {
              if (corMarcada.cor === cor.cor) {
                return { cod: corMarcada.cod, nome: corMarcada.nome, cor: corMarcada.cor, isSelected: true };
              }
              return { cod: corMarcada.cod, nome: corMarcada.nome, cor: corMarcada.cor, isSelected: false };
            });
            setCores(filtroCores);
            setCorSelecionada(cor.cor);
          }}
        />
      ))}
    </>
  );
}
