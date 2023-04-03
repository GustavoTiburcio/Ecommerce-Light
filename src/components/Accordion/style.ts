import styled from 'styled-components';

export const AccordionTitle = styled.button`
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  color: #333;
  cursor: pointer;
  padding: 18px;
  width: 90%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 1.1rem;
  font-weight: 450;
  margin: 10px 0px;
  border-radius: 10px;

  :hover {
    background-color: #ccc;
  }
`;

export const AccordionDiv = styled.div`
  padding: 0 18px;
  background-color: white;
  overflow: hidden;
  text-indent: 3em;
`;
