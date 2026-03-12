export interface Chat {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
}

export type AllChatResponse = Chat[]


export interface Message {
  id: number
  chatId: number
  role: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface SingleChatResponse extends Chat {
  messages: Message[]
}

export interface newChatValue{
    title:string,
    userId:number,
}