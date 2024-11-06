import { InMemoryUsersReporitory } from '@/repositories/in-memory/in-memory-user-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'

let inMemoryUsersReporitory: InMemoryUsersReporitory
let sut: GetUserProfileUseCase

describe('Get User Profile', () => {
  beforeEach(() => {
    inMemoryUsersReporitory = new InMemoryUsersReporitory()
    sut = new GetUserProfileUseCase(inMemoryUsersReporitory)
  })

  it('should get be able user profile', async () => {
    const createUser = await inMemoryUsersReporitory.create({
      name: 'Jhon Doe $7',
      email: '123456',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.findByUserId({
      userId: createUser.id,
    })
    expect(user.name).toEqual('Jhon Doe $7')
  })
})
