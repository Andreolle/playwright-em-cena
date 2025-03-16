import { cataMeias } from "@repo/cata-meias/cataMeias";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await cataMeias(); // Chama a função de scraping
    res.status(200).json(data); // Retorna os dados como JSON
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer scraping' });
  }
}