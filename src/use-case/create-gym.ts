import { GymRepository } from '@/repositories/interface-gym-repository'
import { Gym } from '@prisma/client'

interface GymUseCaseRequeste {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseResponser {
  gym: Gym
}

