import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import httProxy from 'express-http-proxy';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('start'));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({ message: 'Running Gateway' });
});

app.use('/schedular', httProxy(process.env.URL_SCHEDULAR_SERVICE ? process.env.URL_SCHEDULAR_SERVICE : 'https://2023-1-schedula-gerenciador-de-localidades.vercel.app', { timeout: 10000 }));
// app.use('/user', httProxy(process.env.URL_USER_SERVICE, { timeout: 10000 }));
app.use('/printer', httProxy(process.env.URL_PRINTER_SERVICE ? process.env.URL_PRINTER_SERVICE : 'https://two024-1-printgo-printerservice-1.onrender.com/', { timeout: 10000 }));
app.use('/contract', httProxy(process.env.URL_CONTRACT_SERVICE ? process.env.URL_CONTRACT_SERVICE: 'https://two024-1-printgo-contractservice-0x4g.onrender.com/', { timeout: 10000 }));

const PORT = process.env.PORT || 4000;
const gateway = app.listen(PORT, () => {
    console.log(`Gateway is running on ${PORT}`);
});

export { gateway, app };
