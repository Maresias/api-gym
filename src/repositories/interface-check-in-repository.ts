import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findById(id: string): Promise<CheckIn | null>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findManyUserIdCheckInHistory(userId: string, page: number): Promise<CheckIn[]>

  getUserCheckInmetrics(userId: string): Promise<number>

  save(checkIn: CheckIn): Promise<CheckIn>
}
