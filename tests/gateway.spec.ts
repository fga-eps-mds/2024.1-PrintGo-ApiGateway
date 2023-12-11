import request from 'supertest';
import { app, gateway } from '../src/gateway';
import 'dotenv/config';

describe('GET /', () => {
    beforeAll(() => {
      process.env.URL_USER_SERVICE = "https://2023-2-print-go-user-service-seven.vercel.app"
      process.env.URL_PRINTER_SERVICE = "https://2023-2-print-go-printer-service.vercel.app"
      process.env.URL_SCHEDULAR_SERVICE = "https://2023-1-schedula-gerenciador-de-localidades.vercel.app"
      
    })
    afterAll((done) => {
        gateway.close(done);
    });

  it('should return a 200 status and the correct message', async () => {    
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Running Gateway');
  });

  it('should return a 200 status and the correct message', async () => {
    const response = await request(app).get('/printer/impressora');
    expect(response.status).toBe(200);
  });
  it('should return a 200 status and the correct message', async () => {
    const response = await request(app).get('/user');
    expect(response.status).toBe(200);
  });
  it('should return a 200 status and the correct message', async () => {
    const response = await request(app).get('/schedular');
    expect(response.status).toBe(200);
  });
});
