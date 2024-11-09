import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../interface-check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    const checkInSameDate = this.items.find((checkIn) => {
      const checkIndate = dayjs(checkIn.created_at)

      const isSameDay =
        checkIndate.isAfter(startOfTheDay) && checkIndate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isSameDay
    })
    if (!checkInSameDate) {
      return null
    }

    return checkInSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }
    this.items.push(checkIn)

    return checkIn
  }
}
