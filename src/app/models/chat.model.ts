import { Timestamp } from "rxjs"

export interface Chat {
    id: string
    name: string
    chatImage: string
    participants: User[]
    messages: Message[]
    isGroupChat: boolean
    createdAt: Date,
    updatedAt:Date
    isMute?: boolean
    unReadCount?: number
    createdBy: number
}
export interface chatPreview{
    id: string
    name: string
    chatImage: string
    lastMessage:string
    updatedAt:Date
}

export interface NewMessage{
content: string
type: MessageType,
}

export interface Message extends NewMessage {
    id: number
    from: number
    createdAt: Date
}
export interface User {
    id: number
    fullName: string,
    profileImage?: string | null
    about: string
    phoneNumber: string
    signupDate?: Date
}
export interface UserAuth {
    phoneNumber: string
    password: string
    fullName?: string
}

export enum MessageType {
    Text = "text",
    Image = "image",
    Video = "video",
    Recording = "recording"
}


