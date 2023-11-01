import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import httProxy from 'express-http-proxy'

const app = express();

app.use(express.json());

app.use(cors());
app.use(logger('start'))
app.use(helmet())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)  => {
    return res.json({ message: 'Running Gateway' })
})


app.use('/user', httProxy('localhost:8000', {timeout: 3000}))
const PORT = process.env.PORT || 4000;

const gateway = app.listen(PORT, () => {
    console.log(`Gateway is running on ${PORT}`);
});

export { gateway, app };
