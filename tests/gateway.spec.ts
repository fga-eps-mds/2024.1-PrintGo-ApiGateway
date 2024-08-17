import request from 'supertest';
import { app, gateway } from '../src/gateway';

jest.mock('express-http-proxy', () => jest.fn((url, options) => {
    return (req, res, next) => {
        res.status(200).json({ message: `Proxied to ${url}` });
    };
}));

describe('API Gateway', () => {
    afterAll(() => {
        gateway.close(); // Close the server after tests
    });

    test('should proxy requests to /schedular', async () => {
        const res = await request(app).get('/schedular');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_SCHEDULER_SERVICE) });
    });

    test('should proxy requests to /user', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_USER_SERVICE) });
    });

    test('should proxy requests to /printer', async () => {
        const res = await request(app).get('/printer');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_PRINTER_SERVICE) });
    });

    test('should proxy requests to /contract', async () => {
        const res = await request(app).get('/contract');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + process.env.URL_CONTRACT_SERVICE });
    });

});