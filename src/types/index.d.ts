export interface Position {
  lat: number
  lng: number
}

export interface Club {
  id: number
  name: string
  lat: number
  lng: number
}

export interface User {
  id: string
  name: string
  email: string
  image: string
  username: string
  bio: string
  createdAt?: string
  emailVerified: string | null
  updatedAt?: string
}

export interface Notification {
  id: string
  userId: string
  creatorId: string
  message: string
  read: boolean
  createdAt: string
  creator: User
}
