import { Timestamp } from "rxjs"

export interface Chat {
    id: string
    name: string
    imgUrl:string
    participants:User[]
    messages:Message[]
    unReadCount:number
    isGroup:boolean
    isMute:boolean
    createdAt: Date
}

export interface Message {
    id: string
    from: number
    content:string
    isRead:boolean
    createdAt: Date
    type:MessageType,
}
export interface User {
    id: number
    fullName:string,
    profileImage?:string|null
    about:string
    phoneNumber:string
    signupDate?:Date
}
export interface UserAuth{
    phoneNumber:string
    password:string
    fullName?:string
}

export enum MessageType {
    Text = "text",
    Image = "image",
    Video = "video",
    Recording = "recording"
  }

  
