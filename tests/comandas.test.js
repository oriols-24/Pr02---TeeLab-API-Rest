const request = require('supertest');
const app = require('../server'); 

describe('Tests de la API de Comandas', () => {

    // Test 1: POST comanda OK 
    it('Debería crear una comanda correctamente y devolver 201', async () => {
        const nuevaComanda = {
            cliente: { nombre: "Ana", email: "ana@mail.com" },
            direccion: { calle: "Carrer Major 1", cp: "08400", ciudad: "Granollers" },
            items: [
                { camisetaId: "TSH01", talla: "M", color: "negro", cantidad: 2 }
            ]
        };

        const res = await request(app)
            .post('/api/comandas')
            .send(nuevaComanda);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id'); 
        expect(res.body.estado).toEqual('recibida');
        expect(res.body.total).toBeGreaterThan(0);
    });

    // Test 2: POST comanda con camisetaId inválido 
    it('Debería devolver error 400 si el camisetaId es inválido', async () => {
        const comandaInvalida = {
            cliente: { nombre: "Juan", email: "juan@mail.com" },
            items: [
                { camisetaId: "FAKE-999", talla: "M", color: "negro", cantidad: 1 }
            ]
        };

        const res = await request(app)
            .post('/api/comandas')
            .send(comandaInvalida);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errores');
        expect(res.body.errores[0]).toMatch(/no existe/i);
    });

    // Test 3: GET comanda inexistente 
    it('Debería devolver error 404 al buscar una comanda que no existe', async () => {
        const res = await request(app)
            .get('/api/comandas/ORD-999999');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Comanda no encontrada');
    });

});