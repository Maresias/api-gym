import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  findById(checkInId: string): Promise<CheckIn | null>

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findManyUserIdCheckInHistory(userId: string, page: number): Promise<CheckIn[]>

  getUserCheckInmetrics(userId: string): Promise<number>

  save(checkIn: CheckIn): Promise<CheckIn>
}
