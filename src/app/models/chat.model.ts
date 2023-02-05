export interface Chat {
    _id: string
    name: string
    imgUrl:string
    participants:UserDetails[]
    messages:Message[]
    unReadCount:number
    isGroup:boolean
    isMute:boolean
    createdAt: Date
}

export interface Message {
    _id: string
    from: UserDetails
    content:string
    isRead:boolean
    createdAt: Date
    isText:boolean,
    isRecording:boolean,
    isVideo:boolean,
    isImg:boolean

}
export interface User {
    _id: string
    name: string
    imgUrl:string
    about:string
    phoneNumber:number
    chats:Chat[]

}
export interface UserDetails {
    _id: string
    name: string
    imgUrl:string
    about:string
    phoneNumber:string

}
