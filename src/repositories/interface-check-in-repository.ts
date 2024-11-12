import { CheckIn, Prisma } from '@prisma/client'
export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyUserIdCheckInHistory(userId: string, page: number): Promise<CheckIn[]>
}
