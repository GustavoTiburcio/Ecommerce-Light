import React, { useState } from 'react';
import { CorDiv, SelectPersonalizadoContainerDiv } from './styles';
import Select from 'react-dropdown-select';

interface CoresProps {
  codbar?: string;
  setCorSelecionada: any;
}

export default function Cores({ setCorSelecionada }: CoresProps) {
  const [cores, setCores] = useState([
    { cod: 1, nome: 'Cinza', linkFot: 'https://td0295.vtexassets.com/arquivos/ids/1760432-1600-auto?v=638159783722870000&width=1600&height=auto&aspect=true', isSelected: false },
    { cod: 2, nome: 'azul', linkFot: 'https://td0295.vtexassets.com/arquivos/ids/1760416-1600-auto?v=638159783664100000&width=1600&height=auto&aspect=true', isSelected: false },
    { cod: 3, nome: 'ciano', linkFot: 'https://td0295.vtexassets.com/arquivos/ids/1760502-1600-auto?v=638159784412700000&width=1600&height=auto&aspect=true', isSelected: false }
  ]);

  function conteudoSelectPersonalizado({ state }: any) {
    return (
      <SelectPersonalizadoContainerDiv>
        <div>
          {state.values.length > 0 && <div
            style={{
              height: '48px',
              width: '48px',
              backgroundImage: `url(${state.values[0]?.linkFot})`,
              backgroundSize: 'cover',
            }}
          />}
        </div>
        {state.values[0]?.nome ? (
          <span>
            {state.values[0]?.nome}
          </span>
        ) : (
          <p>
            Selecionar Cor
          </p>
        )}
      </SelectPersonalizadoContainerDiv>
    );
  }

  function itemSelectPersonalizado({ item, props, methods }: any) {
    return (
      <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div
            style={{
              height: '48px',
              width: '48px',
              backgroundImage: `url(${item.linkFot})`,
              backgroundSize: 'cover',
              border: '2px solid white'
            }}
          />
          <span style={{ marginLeft: 10 }}>
            {item[props.labelField]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {cores.length > 5 ?
        <Select
          options={cores}
          labelField='nome'
          valueField='cod'
          placeholder={'Cores Disponíveis'}
          onChange={(value: any) => setCorSelecionada(value)}
          itemRenderer={itemSelectPersonalizado}
          contentRenderer={conteudoSelectPersonalizado}
          noDataLabel='Nenhuma cor foi encontrada'
          color='red'
          style={{
            width: '20vw',
            fontWeight: '450',
            textTransform: 'capitalize'
          }}
        /> :
        cores.map((cor: any, index: number) => (
          <CorDiv
            key={index}
            title={cor.nome}
            backgroundImage={cor.linkFot}
            selecionado={cor.isSelected}
            onClick={() => {
              const filtroCores = cores.map(corMarcada => {
                if (corMarcada.nome === cor.nome) {
                  return { cod: corMarcada.cod, nome: corMarcada.nome, linkFot: corMarcada.linkFot, isSelected: true };
                }
                return { cod: corMarcada.cod, nome: corMarcada.nome, linkFot: corMarcada.linkFot, isSelected: false };
              });
              setCores(filtroCores);
              setCorSelecionada(cor.cor);
            }}
          />
        ))
      }
    </>
  );
}
