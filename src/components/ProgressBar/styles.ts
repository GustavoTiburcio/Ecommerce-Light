import styled from 'styled-components';

export interface ProgressBarProps {
  width?: string;
  step?: 'completed' | 'incomplete';
  label?: string;
}

export const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 3rem 0rem;
  @media screen and (max-width: 767px){
    width: 80%;
  }
`;

export const StepContainer = styled.div<ProgressBarProps>`
  display: flex;
  justify-content: space-between;
  /* margin-top: 70px; */
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: #4a154b;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

export const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const StepStyle = styled.div<ProgressBarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${({ step }) =>
    step === 'completed' ? '#4A154B' : '#F3E7F3'};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StepCount = styled.span<ProgressBarProps>`
  font-size: 19px;
  font-weight: 450;
  color: #000;
  opacity: ${({ step }) =>
    step === 'completed' ? '1' : '0.5'};;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const StepsLabelContainer = styled.div<ProgressBarProps>`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 11rem;
  opacity: ${({ step }) =>
    step === 'completed' ? '1' : '0.5'};

  @media screen and (max-width: 767px){
    width: 0rem;
    left: 0%;
    margin-top: 0.5rem;
  }

`;

export const StepLabel = styled.span`
  font-size: 19px;
  color: #4a154b;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

export const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #4a154b;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;
