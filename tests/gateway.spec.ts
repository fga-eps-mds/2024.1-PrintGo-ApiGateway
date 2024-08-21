import request from 'supertest';
import { app, gateway } from '../src/gateway';

jest.mock('express-http-proxy', () => jest.fn((url, options) => {
    return (req, res, next) => {
        res.status(200).json({ message: `Proxied to ${url}` });
    };
}));

describe('API Gateway', () => {
    afterAll(() => {
        gateway.close();
    });

    test('should proxy requests to /schedular', async () => {
        const res = await request(app).get('/schedular');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_SCHEDULER_SERVICE || 'https://2023-1-schedula-gerenciador-de-localidades.vercel.app') });
    });
    
    it('should return a message "Running Gateway"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Running Gateway');
      });

    // test('should proxy requests to /user', async () => {
    //     const res = await request(app).get('/user');
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toEqual({ message: 'Proxied to ' + process.env.URL_USER_SERVICE });
    // });

    test('should proxy requests to /printer', async () => {
        const res = await request(app).get('/printer');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_PRINTER_SERVICE || 'https://two024-1-printgo-printerservice-1.onrender.com/') });
    });

    test('should proxy requests to /contract', async () => {
        const res = await request(app).get('/contract');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + (process.env.URL_CONTRACT_SERVICE || 'https://two024-1-printgo-contractservice-0x4g.onrender.com/') });
    });
});