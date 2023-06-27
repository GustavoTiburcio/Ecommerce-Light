import React, { useState } from 'react';
import { AccordionTitle, AccordionDiv } from './style';
import DynamicIcon from '../DynamicIcon';

interface AccordionProps {
  title: string;
  text?: string;
  checkboxInputArray?: {
    cod: string;
    text: string;
  }[];
  checkboxInputValuesArray?: any;
  setFilter?: (array: any) => void;
}

export default function Accordion({ title, text, checkboxInputArray, checkboxInputValuesArray, setFilter }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);

  function onChangeCheckbox(e: any) {
    if (setFilter === undefined) {
      return;
    }

    if (e.target.checked === true) {
      setFilter((prev: any) => ([...prev, e.target.value]));
      return;
    }

    setFilter((prev: any) => prev.filter((item: any) => item !== e.target.value));
  }

  return (
    <>
      <AccordionTitle onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? (<DynamicIcon name='AiFillCaretUp' />) : (<DynamicIcon name='AiFillCaretDown' />)}</div>
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
                  {' '}{checkboxInput.text}
                </label>
              </div>
            ))
            :
            <p>
              {text}
            </p>}
        </AccordionDiv>}
      <br />
    </>
  );
}
