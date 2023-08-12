const server = require('../src/app')
const session = require('supertest')
const agent = session(server)

describe('Test de Rutas', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async() => {
            await agent.get('/rickandmorty/character/1').expect(200)
        })

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', 
            async () => {
                let response = (await agent.get('/rickandmorty/character/1')).text;
                response = JSON.parse(response)
                expect(response).toHaveProperty('id')
                expect(response).toHaveProperty('name')
                expect(response).toHaveProperty('species')
                expect(response).toHaveProperty('gender')
                expect(response).toHaveProperty('status')
                expect(response).toHaveProperty('origin')
                expect(response).toHaveProperty('image')
            })
        
        it('Si hay un error responde con status 500', async () => {
            const response = (await agent.get('/rickandmorty/character/1000')).status
            expect(response).toBeGreaterThanOrEqual(400)
        })

    
    })

    describe('GET /rickandmorty/login', () => {
        it('Las credentiales son correctas', async () => {
            const response = (await (agent.get('/rickandmorty/login?email=admin@gmail.com&password=Nico123'))).body
            
            expect(response.access).toBeTruthy()
        })
        it('Las credenciales son incorrectas', async () => {
            const response = (await (agent.get('/rickandmorty/login?email=pepita@gmail.com&password=Juan123'))).body

            expect(response.access).toBeFalsy()
        })
    })

    describe('POST /rickandmorty/fav', () => {
        const personaje1 = {id: '1', name: 'Rick'}
        const personaje2 = {id: '2', name: 'Pepe'}
        it('Devuelve el personaje enviado por body', async () => {
            const response = (await agent.post('/rickandmorty/fav').send(personaje1)).body;
            expect(response).toContainEqual(personaje1)
        })
        it('Debe devolver el o los personajes previos y el actual', async () => {
            const response = (await agent.post('/rickandmorty/fav').send(personaje2)).body;
            expect(response).toContainEqual(personaje1)
            expect(response).toContainEqual(personaje2)
        })
    })

    describe('DELETE /rickandmorty/fav/:id', () => {
        const personaje1 = {id: '1', name: 'Rick'}
        const personaje2 = {id: '2', name: 'Pepe'}
        it('Devuelve el arreglo completo si es que no se eliminan personajes', async () => {
            const response = (await agent.delete('/rickandmorty/fav/50')).body

            expect(response).toContainEqual(personaje1)
            expect(response).toContainEqual(personaje2)
        })

        it('Elimina correctamente el personaje', async () => {
            const response = (await agent.delete('/rickandmorty/fav/2')).body

            expect(response).not.toContainEqual(personaje2)
        })
    })
})