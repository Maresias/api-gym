import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Test ( e2e ) Athenticate', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '1234567',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jhondoe@gmail.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
