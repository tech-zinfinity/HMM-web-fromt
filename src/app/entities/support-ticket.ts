import { User } from './user';
export interface SupportTicket {
    id?:string,
    title?:string,
    description?:string,
    priority?:string,
    comment?:string[],
    active?:boolean,
    status?:string[],
    requester?:User,
    reviewver?:User,
    createdOn?:Date|any,
    updatedOn?:Date|any
}
