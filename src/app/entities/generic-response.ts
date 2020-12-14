export interface GenericResponse <T> {
    code?:string,
    message?:string,
    body?:T
}
