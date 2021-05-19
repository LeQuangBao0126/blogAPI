import LoginDto from "./auth.dto";
import userSchema from '@modules/user/user.model';
import HttpException from "@core/Exception/http.exception";
import bcryptjs from 'bcryptjs';
import IUser from "@modules/user/user.interface";
import jwt from 'jsonwebtoken';
import { DataStoreInToken, TokenData } from "./auth.interface";
export default class AuthService {
    public login = async (model: LoginDto) => {
        let userFind: any = await userSchema.findOne({ email: model.email });
        if (!userFind) {
            throw new HttpException(404, "Email not found");
        }
        let isMatchingPassword = await bcryptjs.compare(model.password, userFind.password);
        if (!isMatchingPassword) {
            throw new HttpException(404, "Invalid Email or Password");
        }
        return this.createToken(userFind);
    }
    public createToken(user: IUser): TokenData {
        const dataInToken: DataStoreInToken = { id: user._id };
        const secret: string = "secret";
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: '1d' })
        }
    }
    public getCurrentLoginUser = async (userId: string): Promise<IUser> => {
        let user = await userSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(404, "Credential is not exist");
        }
        return user;
    }

}

