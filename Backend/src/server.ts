import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

app.use('/api', routes);


app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AnimalHotels API is running!' });
});


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});