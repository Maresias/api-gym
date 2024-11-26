import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Test ( e2e ) Check-Ins History', () => {
  beforeEach(() => {
    app.ready()
  })

  afterEach(() => {
    app.close()
  })

  it('should be able possible get history check-ins', async () => {
    await prisma.checkIn.createMany({
      data: [{}, {}],
    })
  })
})
