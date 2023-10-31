export interface RequestRegisterData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface RequestLoginData {
    email: string;
    password: string;
}

export interface ResponseLoginData {
    accessToken: string;
    firstName: string;
    refreshToken:string;
    userId:string;
    userName:string;
}
