import { User } from './user';
export interface AuthReponse {
    user?:User,
    roles?:string[],
    token?:string
}
