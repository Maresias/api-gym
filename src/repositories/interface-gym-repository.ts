import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findManyGyms(search: string, page: number): Promise<Gym[]>
  findManyNearbyGyms(params: FindManyNearbyParams): Promise<Gym[]>
}
