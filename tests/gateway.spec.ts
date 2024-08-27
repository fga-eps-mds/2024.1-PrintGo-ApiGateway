import request from 'supertest';

jest.mock('express-http-proxy', () => jest.fn((url, options) => {
    return (req, res, next) => {
        res.status(200).json({ message: `Proxied to ${url}` });
    };
}));

describe('API Gateway', () => {
    let app, gateway;

    const resetEnv = () => {
        process.env.URL_SCHEDULAR_SERVICE = "";
        process.env.URL_PRINTER_SERVICE = "";
        process.env.URL_CONTRACT_SERVICE = "";
    };

    beforeAll(() => {
        resetEnv();
    });

    afterEach(() => {
        if (gateway) {
            gateway.close();
        }
        resetEnv();
        jest.resetModules();
    });

    it('should proxy to the correct URL for /schedular route when URL_SCHEDULAR_SERVICE is defined', async () => {
        process.env.URL_SCHEDULAR_SERVICE = 'http://localhost:5000';
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/schedular');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'http://localhost:5000' });
    });

    it('should proxy to the fallback URL for /schedular route when URL_SCHEDULAR_SERVICE is not defined', async () => {
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/schedular');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'https://2023-1-schedula-gerenciador-de-localidades.vercel.app' });
    });

    it('should proxy to the correct URL for /printer route when URL_PRINTER_SERVICE is defined', async () => {
        process.env.URL_PRINTER_SERVICE = 'http://localhost:5001';
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/printer');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'http://localhost:5001' });
    });

    it('should proxy to the fallback URL for /printer route when URL_PRINTER_SERVICE is not defined', async () => {
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/printer');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'https://two024-1-printgo-printerservice-1.onrender.com/' });
    });

    it('should proxy to the correct URL for /contract route when URL_CONTRACT_SERVICE is defined', async () => {
        process.env.URL_CONTRACT_SERVICE = 'http://localhost:5002';
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/contract');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'http://localhost:5002' });
    });

    it('should proxy to the fallback URL for /contract route when URL_CONTRACT_SERVICE is not defined', async () => {
        const importedModule = await import('../src/gateway');
        app = importedModule.app;
        gateway = importedModule.gateway;

        const res = await request(app).get('/contract');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Proxied to ' + 'https://two024-1-printgo-contractservice-0x4g.onrender.com/' });
    });
});
