import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Test (e2e) Profile', () => {
  beforeEach(async () => {
    app.ready()
  })
  afterEach(async () => {
    app.close()
  })

  it('should be able get Profile', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon doe',
      email: 'jhondoe@gmail.com',
      password: '1234567',
    })

    const authenticateResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'jhondoe@gmail.com', password: '1234567' })

    expect(authenticateResponse.statusCode).toEqual(200)

    const { token } = authenticateResponse.body

    const responeProfile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responeProfile.statusCode).toEqual(200)
    expect(responeProfile.body.user).toEqual(
      expect.objectContaining({ email: 'jhondoe@gmail.com' }),
    )
  })
})
