import { InMemoryUsersReporitory } from '@/repositories/in-memory/in-memory-user-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { AuthenticateUserCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let inMemoryUsersReporitory: InMemoryUsersReporitory
let sut: AuthenticateUserCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    inMemoryUsersReporitory = new InMemoryUsersReporitory()
    sut = new AuthenticateUserCase(inMemoryUsersReporitory)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUsersReporitory.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersReporitory.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
