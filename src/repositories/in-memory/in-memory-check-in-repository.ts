import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../interface-check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

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

  async findById(checkInId: string) {
    const checkIn = this.items.find((item) => item.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findManyUserIdCheckInHistory(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

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

  async getUserCheckInmetrics(userId: string) {
    const checkInMetrics = this.items.filter(
      (item) => item.user_id === userId,
    ).length

    return checkInMetrics
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }
}
