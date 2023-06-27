import React, { useState } from 'react';
import { AccordionTitle, AccordionDiv } from './style';
import IconeDinamico from '../IconeDinamico';

interface AccordionProps {
  titulo: string;
  texto?: string;
  checkboxInputArray?: {
    cod: string;
    texto: string;
  }[];
  checkboxInputValuesArray?: any;
  setFiltro?: (array: any) => void;
}

export default function Accordion({ titulo, texto, checkboxInputArray, checkboxInputValuesArray, setFiltro }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);

  function onChangeCheckbox(e: any) {
    if (setFiltro === undefined) {
      return;
    }

    if (e.target.checked === true) {
      setFiltro((prev: any) => ([...prev, e.target.value]));
      return;
    }

    setFiltro((prev: any) => prev.filter((item: any) => item !== e.target.value));
  }

  return (
    <>
      <AccordionTitle onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
        <div>{isActive ? (<IconeDinamico nome='AiFillCaretUp' />) : (<IconeDinamico nome='AiFillCaretDown' />)}</div>
      </AccordionTitle>
      {isActive &&
        <AccordionDiv>
          {checkboxInputArray ?
            checkboxInputArray.map((checkboxInput, index) => (
              <div key={index} style={{ textAlign: 'left', textIndent: '0rem', fontWeight: 450 }}>
                <label>
                  <input
                    type="checkbox"
                    value={checkboxInput.cod}
                    onChange={onChangeCheckbox}
                    name='teste'
                    checked={checkboxInputValuesArray.includes(checkboxInput.cod)}
                  />
                  {' '}{checkboxInput.texto}
                </label>
              </div>
            ))
            :
            <p>
              {texto}
            </p>}
        </AccordionDiv>}
      <br />
    </>
  );
}
