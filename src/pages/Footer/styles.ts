import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 2rem 0px;
  }
`;

export const DetailsView = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 1rem 0px;

  p {
    text-align: justify;
    text-indent: 3rem;
  }

  b{
    font-weight: bold;
    font-size: 1.2rem;
  }

  details summary {
    cursor: pointer;
    transition: margin 150ms ease-out;
    font-weight: bold;
    font-size: 1.2rem;
  }

  details[open] summary {
    margin-bottom: 10px;
  }
`;
