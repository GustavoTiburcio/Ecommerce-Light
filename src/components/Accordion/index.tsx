import React, { useState } from 'react';
import { AccordionTitle, AccordionDiv } from './style';
import * as AiIcons from 'react-icons/ai';

interface AccordionProps {
  titulo: string;
  conteudo?: string;
}

export default function Accordion({ titulo, conteudo }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <AccordionTitle onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
        <div>{isActive ? (<AiIcons.AiFillCaretUp />) : (<AiIcons.AiFillCaretDown />)}</div>
      </AccordionTitle>
      {isActive &&
        <AccordionDiv>
          <p>
            {conteudo}
          </p>
        </AccordionDiv>}
    </>
  );
}
