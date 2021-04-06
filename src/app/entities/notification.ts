export interface Notification {
    id?:string,
    message?:string,
    createdOn?:Date | any,
    redirectionURL?:string,
    modes?:string[],
    userIds?:string[],
    statusMap?:string[]
}
