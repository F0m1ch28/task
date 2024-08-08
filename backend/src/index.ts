import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

interface User {
  email: string;
  number: string;
}

const data: User[] = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
];

app.get('/', (req: Request, res: Response) => {
  res.send('Сервер работает.');
});

app.post('/search', async (req: Request, res: Response) => {
  const { email, number }: { email: string; number?: string } = req.body;

  if (!email || (number && !/^\d{2}-\d{2}-\d{2}$/.test(number))) {
    res.status(400).json({ error: 'Неверный email или number' });
    return;
  }

  const formattedNumber = number ? number.replace(/-/g, '') : '';
  const results = data.filter(item =>
    item.email.toLowerCase().includes(email.toLowerCase()) &&
    (!formattedNumber || item.number === formattedNumber)
  );

  setTimeout(() => {
    res.json(results);
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
