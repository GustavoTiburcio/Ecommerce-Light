import React from 'react';
import { Container } from './styles';
import { Player } from '@lottiefiles/react-lottie-player';
import orderGif from '../../assets/images/order-completed.json';
import { useNavigate } from 'react-router-dom';

export default function FinishedOrder() {
  const navigate = useNavigate();

  return (
    <Container>
      <Player
        src={orderGif}
        onEvent={event => {
          if (event === 'complete') navigate('/');
        }}
        className='player'
        loop={false}
        autoplay
        keepLastFrame
        style={{ height: 500 }}
      />
    </Container>
  );
}
