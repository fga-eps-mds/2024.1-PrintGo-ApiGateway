import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import httProxy from 'express-http-proxy'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import 'dotenv/config'

const app = express();

const pathFile = resolve(process.cwd(), process.env.CONFIG_FILE || 'config.yml')
const  readConfig = readFileSync(pathFile, {encoding: 'utf8'})

type Service = {
    name: string;
    url: string;
}

type ServicesConfig = {
    services: Service[];
}

const servicesConfig  = load(readConfig, {json: true}) as ServicesConfig

app.use(express.json());

app.use(cors());
app.use(logger('start'))
app.use(helmet())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)  => {
    return res.json({ message: 'Running Gateway' })
})

servicesConfig.services.forEach(({ name, url }) => {    
    app.use(`/${name}`, httProxy(url, {timeout: 10000}))
});

const PORT = process.env.PORT || 4000;

const gateway = app.listen(PORT, () => {
    console.log(`Gateway is running on ${PORT}`);
});

export { gateway, app };
