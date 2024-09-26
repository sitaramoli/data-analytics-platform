// pages/api/data.ts
import type {NextApiRequest, NextApiResponse} from 'next';

interface SampleData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<SampleData | { message: string }>) {
  if (req.method === 'GET') {
    const sampleData: SampleData = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      series: [
        {
          name: 'Sales',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
        },
        {
          name: 'Revenue',
          data: [24.9, 30.5, 90.4, 110.2, 130.0, 140.0, 180.0]
        }
      ]
    };
    res.status(200).json(sampleData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} Not Allowed`});
  }
}