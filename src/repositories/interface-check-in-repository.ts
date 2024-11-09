import { CheckIn, Prisma } from '@prisma/client'
export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string): Promise<CheckIn | null>
}
