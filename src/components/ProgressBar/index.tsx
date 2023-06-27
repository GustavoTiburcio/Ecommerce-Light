import React from 'react';
import {
  CheckMark, MainContainer, StepContainer, StepCount,
  StepLabel, StepStyle, StepWrapper, StepsLabelContainer
} from './styles';


export default function ProgressBar({ steps, activeStep }: any) {

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <MainContainer>
      <StepContainer width={width}>
        {steps.map(({ step, label }: any) => (
          <StepWrapper key={step}>
            <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
              {activeStep > step ? (
                <CheckMark>L</CheckMark>
              ) : (
                <StepCount step={activeStep >= step ? 'completed' : 'incomplete'}>{step}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer step={activeStep >= step ? 'completed' : 'incomplete'}>
              <StepLabel key={step}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
    </MainContainer>
  );
}
