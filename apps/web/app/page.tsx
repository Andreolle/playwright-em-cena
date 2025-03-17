"use client"

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'next/image'
import { Loading } from "../components/loading";

type DataType = {
  text: string
  images: string[]
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background: transparent;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const Item = styled.div`
  display: flex;
  flex: 1 1 calc(25% - 16px);
  box-sizing: border-box;
  border: 1px solid transparent;
  padding: 16px;
  text-align: center;
  font-family: sans-serif;
  flex-direction: column;
  &:hover {
    border: 1px solid #ccc;
    cursor: pointer;
  }
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

const Images = styled.div`
  min-height: 510px;
  img:last-child {
    display: none;
  }
  &:hover {
    img:first-child {
      display: none;
    }
    img:last-child {
      display: block;
    }
  }
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

  if (data) {
    return (
      <Shelf>
      {
        data?.map((e) => {
          return (
            <Item
              key={e.text}
            >
              <Images>
                <Image
                  src={e.images[0] || ''}
                  alt={e.text}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              
                <Image
                  src={e.images[1] || ''}
                  alt={e.text}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Images>

              <Title>{handleText(e.text)?.title}</Title>
              <Price>{handleText(e.text)?.price}</Price>
            </Item>  
          )
        })
      }
    </Shelf>
    )
  }

  return (
    <Container>
      <Loading />
    </Container>
  )
}
