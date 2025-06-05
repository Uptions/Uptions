'use client'
import Payment from './component/payment'
import styled from "styled-components";

const Background = styled.div`
  background-image: url("/assets/images/pattern.svg");
  background-size: cover;
  background-position: center;

  width: 100%;
`;

const page = () => {
  return (
    <div>
        <Background>
        <Payment />
        </Background>
    </div>
  )
}

export default page