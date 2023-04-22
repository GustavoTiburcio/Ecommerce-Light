import React, { useState, useEffect } from 'react';
import { CorDiv, SelectPersonalizadoContainerDiv } from './styles';
import Select from 'react-dropdown-select';

interface CoresProps {
  codbar?: string;
  setCorSelecionada: any;
  coresLista: string[];
}

export default function Cores({ setCorSelecionada, coresLista }: CoresProps) {
  const [cores, setCores] = useState<any>([]);

  useEffect(() => {
    setCores(coresLista);
  }, [coresLista]);

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
        {state.values[0]?.padmer ? (
          <span>
            {state.values[0]?.padmer}
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
          labelField='padmer'
          valueField='cod'
          placeholder={'Cores Disponíveis'}
          onChange={(value: any) => {
            const [cor] = value;
            setCorSelecionada(cor);
          }}
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
            title={cor.padmer}
            backgroundImage={
              cor?.linkFot === 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg' ?
                null : cor.linkFot
            }
            selecionado={cor.isSelected}
            onClick={() => {
              const filtroCores = cores.map((corMarcada: any) => {
                if (corMarcada.cod === cor.cod) {
                  return { cod: corMarcada.cod, padmer: corMarcada.padmer, linkFot: corMarcada.linkFot, isSelected: true };
                }
                return { cod: corMarcada.cod, padmer: corMarcada.padmer, linkFot: corMarcada.linkFot, isSelected: false };
              });
              setCores(filtroCores);
              setCorSelecionada(cor);
            }}
          >
            {cor?.linkFot === 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg' ? (<span>{cor?.padmer}</span>) : null}
          </CorDiv>
        ))
      }
    </>
  );
}
