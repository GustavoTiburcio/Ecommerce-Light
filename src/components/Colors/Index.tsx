import React, { useState, useEffect } from 'react';
import { ColorDiv, CustomSelectContainerDiv } from './styles';
import Select from 'react-dropdown-select';
import useWindowDimensions from '../../utils/WindowDimensions';

interface ColorsProps {
  sku?: string;
  setSelectedColor: any;
  ColorList: string[];
}

export default function Colors({ setSelectedColor, ColorList }: ColorsProps) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;
  const [colors, setColors] = useState<any>([]);

  useEffect(() => {
    setColors(ColorList);
  }, [ColorList]);

  function customSelectContent({ state }: any) {
    return (
      <CustomSelectContainerDiv>
        <div>
          {state.values.length > 0 && <div
            style={{
              height: isMobile ? '36px':'48px',
              width: isMobile ? '36px':'48px',
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
      </CustomSelectContainerDiv>
    );
  }

  function customItemSelect({ item, props, methods }: any) {
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
      {colors.length > 5 ?
        <Select
          options={colors}
          labelField='padmer'
          valueField='cod'
          placeholder={'Available Colors'}
          onChange={(value: any) => {
            const [cor] = value;
            setSelectedColor(cor);
          }}
          itemRenderer={customItemSelect}
          contentRenderer={customSelectContent}
          noDataLabel='Ño colors has been found'
          color='red'
          style={{
            width: isMobile ? '90vw' : '20vw',
            fontWeight: '450',
            textTransform: 'capitalize'
          }}
        /> :
        colors.map((cor: any, index: number) => (
          <ColorDiv
            key={index}
            title={cor.padmer}
            backgroundImage={
              cor?.linkFot === 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg' ?
                null : cor.linkFot
            }
            selecionado={cor.isSelected}
            onClick={() => {
              const filtroCores = colors.map((corMarcada: any) => {
                if (corMarcada.cod === cor.cod) {
                  return { cod: corMarcada.cod, padmer: corMarcada.padmer, linkFot: corMarcada.linkFot, isSelected: true };
                }
                return { cod: corMarcada.cod, padmer: corMarcada.padmer, linkFot: corMarcada.linkFot, isSelected: false };
              });
              setColors(filtroCores);
              setSelectedColor(cor);
            }}
          >
            {cor?.linkFot === 'https://darckmoveis.meucatalogodigital.com/imagens/nofigure.jpg' ? (<span>{cor?.padmer}</span>) : null}
          </ColorDiv>
        ))
      }
    </>
  );
}
