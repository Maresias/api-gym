import { it, describe, expect } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersReporitory } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Resgister User Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersReporitory = new InMemoryUsersReporitory()
    const registerUserCase = new RegisterUserCase(inMemoryUsersReporitory)

    const { user } = await registerUserCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('shoul hash user passwor upon registration', async () => {
    const inMemoryUsersReporitory = new InMemoryUsersReporitory()
    const registerUserCase = new RegisterUserCase(inMemoryUsersReporitory)

    const { user } = await registerUserCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersReporitory = new InMemoryUsersReporitory()
    const registerUserCase = new RegisterUserCase(inMemoryUsersReporitory)

    const email = 'jhondoe@email.com'

    await registerUserCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUserCase.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
