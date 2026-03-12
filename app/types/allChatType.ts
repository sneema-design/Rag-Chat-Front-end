export interface Chat {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
}

export type AllChatResponse = Chat[]