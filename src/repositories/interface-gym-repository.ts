import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  findManyGyms(search: string, page: number): Promise<Gym[]>
  findManyNearbyGyms(params: FindManyNearbyParams): Promise<Gym[]>
}
