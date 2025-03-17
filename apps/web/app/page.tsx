"use client"

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'next/image'

type DataType = {
  text: string
  images: string[]
}

const Item = styled.div`
  display: flex;
  flex: 1 1 calc(25% - 16px);
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
  font-family: sans-serif;
  flex-direction: column;
  img {
    width: 100%;
    margin-bottom: 1.5rem;
  }
`

const Shelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const Title = styled.span`
  font-size: 1.25rem;
`

const Price = styled.span`
  font-size: 1rem;
  margin-top: 1rem;
`

const handleText = (text: string) => {
  const regex = /^Encontrar similares\s+([\s\S]+?)\s+(R\$\s*\d+,\d+\s*à vista)$/;
  const match = text?.match(regex);
  
  if (!match) return
  const title = match[1]?.trim()
  const price = match[2]?.trim()

  return {
    title,
    price
  }
}

export default function Home() {
  const [data, setData] = useState<DataType[]>();

  useEffect(() => {
    fetch('/api/scrape')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Shelf>
      {
        data?.map((e) => (
          <Item key={e.text}>
            <Image
              src={e?.images[0]}
              alt={e.text}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
          />
            <Title>{handleText(e.text)?.title}</Title>
            <Price>{handleText(e.text)?.price}</Price>
          </Item>  
        ))
      }
    </Shelf>
  )
}
