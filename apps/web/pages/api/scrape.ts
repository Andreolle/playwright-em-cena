import { cataMeias } from "@repo/cata-meias/cataMeias";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await cataMeias();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Erro ao fazer scraping' });
  }
}