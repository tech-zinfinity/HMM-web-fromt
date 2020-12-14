export interface User {
    id?:string,
    username?:string,
    email?:string,
    password?:string,
    roles?:string[],
    active?:boolean,
    createdOn?: Date | any,
    updatedOn?: Date | any,
    verified: boolean
}
