import styled, { keyframes } from "styled-components";
import Image from 'next/image'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
  
const Circle = styled.div`
  background-color: #aaa;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: relative;
  animation: ${rotate} 3s linear infinite;
  img {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`

export function Loading() {
  return (
    <Circle>
      <Image
        src="/loading.png"
        alt="Carregando..."
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: '200px',
          height: 'auto'
        }}
      />
    </Circle>
  );
}