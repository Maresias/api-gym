import {it, describe, expect} from 'vitest'
import  { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersReporitory } from '@/repositories/in-memory/in-memory-user-repository'


describe('Resgister User Case', () =>{
    it('shoul hash user passwor upon registration', async ()=> {
        const inMemoryUsersReporitory = new InMemoryUsersReporitory()
        const registerUserCase = new RegisterUserCase(inMemoryUsersReporitory)

        const { user } = await registerUserCase.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})