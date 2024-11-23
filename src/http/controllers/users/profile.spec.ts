import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createUserAuthenticate } from '@/utils/test/create-user-authenticate.spec'

describe('Test (e2e) Profile', () => {
  beforeEach(async () => {
    app.ready()
  })
  afterEach(async () => {
    app.close()
  })

  it('should be able get Profile', async () => {
    const authUser = await createUserAuthenticate(app)

    const { token, email } = authUser

    const responeProfile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responeProfile.statusCode).toEqual(200)
    expect(responeProfile.body.user).toEqual(expect.objectContaining({ email }))
  })
})
