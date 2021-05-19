import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';
export default class UserRegisterDto {
    constructor(
        first_name: string,
        last_name: string,
        email: string,
        password: string
    ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
    @IsNotEmpty({ message: "first_name ko dc rong" })
    public first_name: string;
    @IsNotEmpty({ message: "last_name ko dc rong" })
    public last_name: string;
    @IsNotEmpty({ message: "email ko dc rong" })
    @IsEmail()
    public email: string;
    @IsNotEmpty({ message: "password ko dc rong" })
    public password: string;
}