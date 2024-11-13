import { Gym, Prisma } from '@prisma/client'

import {
  GymRepository,
  FindManyNearbyParams,
} from '../interface-gym-repository'

import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymRepository implements GymRepository {
  public gyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ? data.id : randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyGyms(search: string, page: number) {
    const gyms = this.gyms
      .filter((item) => item.title.includes(search))
      .slice((page - 1) * 20, page * 20)
    return gyms
  }

  async findManyNearbyGyms(params: FindManyNearbyParams) {
    return this.gyms.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}
