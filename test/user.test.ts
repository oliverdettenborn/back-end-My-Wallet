/* eslint-disable no-undef */
import db from '../src/database'
import supertest from 'supertest'
import app from '../src/app'

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

let token: string

describe('POST /sign-up', () => {
  it('should return 201 on success sign-up', async () => {
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

  it('should return 422 on error sign-up', async () => {
    const body = {
      name: 'Teste de Teste',
      email: 'teste@gmail.com',
      password: '1',
      confirmPassword: '123'
    }

    const response = await supertest(app).post('/api/users/sign-up').send(body)
    expect(response.status).toBe(422)
  })
  it('should return 409 on error sign-up', async () => {
    const body = {
      name: 'Teste do Teste',
      email: 'teste@gmail.com',
      password: 'teste456',
      confirmPassword: 'teste456'
    }

    const response = await supertest(app).post('/api/users/sign-up').send(body)
    expect(response.status).toBe(409)
  })
  it('should return 400 on error sign-up with empty body', async () => {
    const response = await supertest(app).post('/api/users/sign-up').send({})
    expect(response.status).toBe(400)
  })
  it('should return 422 on error sign-up', async () => {
    const body = {
      name: '<script>meu vírus</script>',
      email: '<script>meu vírus</script>',
      password: '<script>meu vírus</script>',
      confirmPassword: '<script>meu vírus</script>'
    }

    const response = await supertest(app).post('/api/users/sign-up').send(body)
    expect(response.status).toBe(422)
  })
})

describe('POST /sign-in', () => {
  it('should return 200 on success sign-in', async () => {
    const body = {
      email: 'teste@gmail.com',
      password: 'teste123'
    }

    const response = await supertest(app).post('/api/users/sign-in').send(body)
    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
    token = response.body.token
  })
  it('should return 401 on error sign-in wrong password', async () => {
    const body = {
      email: 'teste@gmail.com',
      password: 'teste456'
    }

    const response = await supertest(app).post('/api/users/sign-in').send(body)
    expect(response.status).toBe(401)
  })
  it('should return 422 on error sign-in with html', async () => {
    const body = {
      email: '<script>meu vírus</script>',
      password: '<script>meu vírus</script>'
    }

    const response = await supertest(app).post('/api/users/sign-in').send(body)
    expect(response.status).toBe(422)
  })
  it('should return 400 on error sign-in with empty body', async () => {
    const response = await supertest(app).post('/api/users/sign-in').send({})
    expect(response.status).toBe(400)
  })
})

describe('POST /sign-out', () => {
  it('should return 401 on forgot token', async () => {
    const response = await supertest(app).post('/api/users/sign-out')
    expect(response.status).toBe(401)
  })

  it('should return 401 on wrong structure token', async () => {
    const response = await supertest(app).post('/api/users/sign-out').set('Authorization', ` ${token}`)
    expect(response.status).toBe(401)
  })

  it('should return 401 on wrong token', async () => {
    const response = await supertest(app).post('/api/users/sign-out').set('Authorization', 'Bearer teste')
    expect(response.status).toBe(401)
  })

  it('should return 200 on success sign-out', async () => {
    const response = await supertest(app).post('/api/users/sign-out').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('should return 401 after user sucess sign-out', async () => {
    const response = await supertest(app).post('/api/users/sign-out').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(401)
  })
})
