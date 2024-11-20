import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Test e2e Register', () => {
  beforeEach(async () => {
    app.ready()
  })

  afterEach(async () => {
    app.close()
  })
  it('should be possible register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(201)
  })
})
