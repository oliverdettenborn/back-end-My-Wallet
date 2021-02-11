/* eslint-disable no-undef */
const db = require('../src/database')
const supertest = require('supertest')
const app = require('../src/app')

const cleanDatabase = async () => {
  await db.query('DELETE FROM sessions')
  await db.query('DELETE FROM wallet')
  await db.query('DELETE FROM users')
}

beforeAll(cleanDatabase)
afterAll(async () => {
  await cleanDatabase()
  db.end()
})

let token: string, userId: number, idRecord: number

describe('User sign-up and sign-in to get token', () => {
  it('should users sign-up', async () => {
    const body = {
      name: 'Teste',
      email: 'teste@gmail.com',
      password: 'teste123',
      confirmPassword: 'teste123'
    }

    const response = await supertest(app).post('/api/users/sign-up').send(body)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      name: 'Teste',
      email: 'teste@gmail.com'
    })
  })
  it('should user sign-in', async () => {
    const body = {
      email: 'teste@gmail.com',
      password: 'teste123'
    }

    const response = await supertest(app).post('/api/users/sign-in').send(body)
    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
    token = response.body.token
    userId = response.body.userId
  })
})

describe('POST /user/wallet/entry', () => {
  it('should return 200 to create new entry', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'entry'
    }

    const response = await (await supertest(app).post('/api/user/wallet/entry').send(body).set('Authorization', `Bearer ${token}`))
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      description: 'Teste',
      amount: 'R$ 1,50',
      kind: 'entry',
      userId: userId
    })
    idRecord = response.body.id
  })

  it('should return 401 to wrong token', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'entry'
    }
    const response = await supertest(app).post('/api/user/wallet/entry').send(body).set('Authorization', 'Bearer lalala')
    expect(response.status).toBe(401)
  })

  it('should return 401 forgot token', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'entry'
    }
    const response = await supertest(app).post('/api/user/wallet/entry').send(body)
    expect(response.status).toBe(401)
  })
})

describe('POST /user/wallet/outgoing', () => {
  it('should return 200 to create new outgoing', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'outgoing'
    }

    const response = await (await supertest(app).post('/api/user/wallet/outgoing').send(body).set('Authorization', `Bearer ${token}`))
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      description: 'Teste',
      amount: '-R$ 1,50',
      kind: 'outgoing',
      userId: userId
    })
  })

  it('should return 401 to wrong token', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'outgoing'
    }
    const response = await supertest(app).post('/api/user/wallet/outgoing').send(body).set('Authorization', 'Bearer lalala')
    expect(response.status).toBe(401)
  })

  it('should return 401 forgot token', async () => {
    const body = {
      description: 'Teste',
      amount: '1,50',
      kind: 'outgoing'
    }
    const response = await supertest(app).post('/api/user/wallet/outgoing').send(body)
    expect(response.status).toBe(401)
  })
})

describe('GET /user/wallet', () => {
  it('should return 200 to get all obj user wallet', async () => {
    const response = await supertest(app).get('/api/user/wallet').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.records).toBeTruthy()
    expect(response.body.total).toBeTruthy()
  })

  it('should return 401 to wrong token', async () => {
    const response = await supertest(app).get('/api/user/wallet').set('Authorization', 'Bearer lalala')
    expect(response.status).toBe(401)
  })

  it('should return 401 forgot token', async () => {
    const response = await supertest(app).get('/api/user/wallet')
    expect(response.status).toBe(401)
  })
})

describe('DELETE /api/user/wallet/:idRecord', () => {
  it('should return 200 to delete a record', async () => {
    const response = await supertest(app).delete(`/api/user/wallet/${idRecord}`).set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('should return 401 to wrong token', async () => {
    const response = await supertest(app).delete(`/api/user/wallet/${idRecord}`).set('Authorization', 'Bearer lalala')
    expect(response.status).toBe(401)
  })

  it('should return 401 forgot token', async () => {
    const response = await supertest(app).delete(`/api/user/wallet/${idRecord}`)
    expect(response.status).toBe(401)
  })
})
