import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';
export default class LoginDto {
    constructor(email: string, pass: string) {
        this.email = email;
        this.password = pass;
    }

    @IsNotEmpty({ message: "email ko dc rong" })
    @IsEmail()
    public email: string;
    @IsNotEmpty({ message: "password ko dc rong" })
    public password: string;
}