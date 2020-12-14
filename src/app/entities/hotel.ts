import { Address } from "cluster";
import { ContactInfo } from "./contact-info";
import { User } from "./user";

export interface Hotel {
    id?:string,
    name?:string,
    address?:Address,
    contactinfo?:ContactInfo,
    active?:boolean,
    location?:number[],
    status?:string,
    deleted?:boolean,
    photo?:string,
    user?:User
}
