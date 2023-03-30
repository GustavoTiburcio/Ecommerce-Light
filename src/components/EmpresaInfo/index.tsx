import React from 'react';
import { Container, ImageDiv, Image, TextDiv } from './styles';

export default function EmpresaInfo() {
  return (
    <Container>
      <ImageDiv>
        <Image src='https://ioaltogiro.vtexassets.com/arquivos/AG_New-Home_SabrinaSato.jpg'/>
      </ImageDiv>
      <TextDiv>
        <b>Paixão pelo corpo em movimento</b>
        <span>No mercado há quatro décadas, a Alto Giro é referência na confecção de roupas fitness e beachwear. Através da sinergia entre fornecedores, colaboradores e parceiros, entregamos um produto de qualidade premium, com o que há de melhor em tecnologia, conforto, segurança e beleza, assim fazemos as pessoas se sentirem mais belas e mais elas em qualquer atividade do dia a dia, na academia ou outra prática esportiva.</span>
        <br />
        <span>Buscamos inspirações na moda, história, cultura, arte, e em diversas fontes, mas olhamos para o mercado atual e entendemos o momento em que vivemos para que assim possamos entregar o que você procura e o que você precisa.</span>
        <br />
        <span>Sabemos que você é versátil e flexível, e nossos looks deixam seus dias mais confortáveis, afinal nós temos paixão pelo corpo em movimento.</span>
        <br />
      </TextDiv>
    </Container>
  );
}
