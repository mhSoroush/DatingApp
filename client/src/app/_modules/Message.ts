export interface Message {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: any
    recipientId: number
    recipientUsername: string
    recipientPhotoUrl: any
    content: string
    dateRead?: Date
    messageSent: Date
  }