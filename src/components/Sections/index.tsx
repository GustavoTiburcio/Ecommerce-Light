import React from 'react';
import { Container, SectionImage, SectionImageDiv } from './styles';

export default function Sections() {
  return (
    <Container>
      <SectionImageDiv>
        <SectionImage src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/15606839-318f-4cac-aa26-d3f71db96737___f8656297b7360010dab75e617e6fd9d8.jpg' />
        <p>Beach Tennis</p>
      </SectionImageDiv>
      <SectionImageDiv>
        <SectionImage src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/3c0c9e4e-4a5c-4da1-80ec-0c4f554a1885___b47024e2efb14361a15bac666a479a73.jpg' />
        <p>Fitness</p>
      </SectionImageDiv>
      <SectionImageDiv>
        <SectionImage src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/c51fd040-6054-4422-9080-c8fc7603dd42___61781df2b77023ac8a6d93cd07b7304c.jpg' />
        <p>Moda Praia</p>
      </SectionImageDiv>
      <SectionImageDiv>
        <SectionImage src='https://td0295.vtexassets.com/assets/vtex.file-manager-graphql/images/3371f131-a009-412a-8e2a-c42a8356041f___cac1384cbb9fc6a8030946d5287115cd.jpg' />
        <p>Moda Praia Kids</p>
      </SectionImageDiv>
    </Container>
  );
}
