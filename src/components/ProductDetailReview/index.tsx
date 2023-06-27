import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import { ProductScoreDiv, Container, ReviewDiv, StarDiv } from './styles';
import { toast } from 'react-toastify';
import api from '../../services/api';

interface ProductDetailReviewProps {
  sku: string | undefined;
}

export default function ProductDetailReview({ sku }: ProductDetailReviewProps) {
  const [reviews, setReviews] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  async function getProductReviews(sku: string | undefined) {
    if (!sku) {
      throw Error('Codbar não foi informado');
    }

    try {
      const response = await api.get(`/avaliacoes/listarPorCodbar?codbar=${sku}`);

      if (response.status === 200) {

        const media = response.data.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue?.pon,
          0
        ) / response.data.length;

        setAverageScore(media);

        setReviews(response.data);
      }

    } catch (error: any) {
      toast.error('Failed to fetch products review. ' + error.message);
    }
  }

  function Stars() {
    const stars = [];

    for (let index = 0; index < 5; index++) {
      if (index < Math.floor(averageScore)) {
        stars.push(<AiIcons.AiFillStar color='yellow' style={{ stroke: 'black', strokeWidth: 20 }} key={index} />);
      } else {
        stars.push(<AiIcons.AiOutlineStar key={index} />);
      }
    }
    return <>{stars}</>;
  }

  useEffect(() => {
    getProductReviews(sku);
  }, []);

  return (
    <Container>
      <ProductScoreDiv>
        <span><b>{!averageScore ? '-' : averageScore}</b>/5</span>
        <span>Product Rate</span>
        <StarDiv>
          <Stars />
        </StarDiv>
        <p>Based on {reviews.length} ratings</p>
      </ProductScoreDiv>
      <ReviewDiv>
        {reviews.length > 0 ?
          reviews.map((avaliacao: any, index: number) => (
            <span key={index} title={avaliacao.det}>&ldquo;{avaliacao.det}&ldquo;</span>
          ))
          :
          <span>No reviews have been reported yet.</span>
        }
      </ReviewDiv>
    </Container>
  );
}
