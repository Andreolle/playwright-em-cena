"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/scrape')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(data, "MMMMMMMMMM")
  return data?.map((e) => (
    <>
      <img src={e?.images[0]} />
      <h1>{e?.text}</h1>
    </>
  ))
}
