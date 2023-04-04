import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  height: 15rem;
  margin: 2rem 0px;
  background-color: #f7f7f7;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

  b{
    font-size: 1.5rem;
  }
`;

export const InputsDiv = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  padding: 10px 5px;
  width: 40%;

  ::placeholder {
    font-weight: bold;
    opacity: 0.5;
    font-size: 1rem;
  }
`;

export const Button = styled.button`
  background-color: white;
  color: #fff;
  width: 15%;
  height: 20%;
  background-color: #555555;
  border-style: none;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`;
