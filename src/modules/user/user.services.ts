import userSchema from './user.model';
import UserRegisterDto from './dtos/UserRegister';
import { DataStoreInToken, TokenData } from '@modules/auth';
import HttpException from '@core/Exception/http.exception';
import IUser from './user.interface';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import gravatar from 'gravatar';
import IPagination from '@core/interfaces/IPagination';

export default class UserService {
    public userSchema = userSchema;
    constructor() { }
    public async create(model: UserRegisterDto): Promise<TokenData> {
        let user = await this.userSchema.findOne({ email: model.email });
        if (user) {
            throw new HttpException(400, "Email elready exist in system");
        }
        const hashedPassword = await bcryptjs.hash(model.password, 7);
        const avatar = gravatar.url('emerleite@gmail.com', { s: '200', r: 'pg', d: '404' });
        const createdUser: IUser = await this.userSchema.create({
            ...model,
            avatar: avatar,
            password: hashedPassword,
            date: Date.now()
        });
        return this.createToken(createdUser);
    }
    public createToken(user: IUser): TokenData {
        const dataInToken: DataStoreInToken = { id: user._id };
        const secret = "SECRET"
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: '60s' })
        }
    }
    public async findUserById(userId: string): Promise<IUser> {
        let user: any = await this.userSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(400, "Can not get this user");
        }
        return user;
    }
    public async updateUser(userId: string, model: UserRegisterDto): Promise<IUser> {
        const user = await this.userSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(400, `User id is not exist`);
        }
        let avatar = user.avatar;
        if (user.email === model.email) {
            throw new HttpException(400, 'You must using the difference email');
        } else {
            avatar = gravatar.url(model.email!, {
                size: '200',
                rating: 'g',
                default: 'mm',
            });
        }
        let updateUserById;
        if (model.password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(model.password, salt);
            updateUserById = await this.userSchema
                .findByIdAndUpdate(userId, {
                    ...model,
                    avatar: avatar,
                    password: hashedPassword,
                }, { new: true })
                .exec();
        } else {
            updateUserById = await this.userSchema
                .findByIdAndUpdate(userId, {
                    ...model,
                    avatar: avatar,
                }, { new: true })
                .exec();
        }
        if (!updateUserById) throw new HttpException(409, 'You are not an user');
        return updateUserById;
    }
    public async getAllUser(): Promise<IUser[]> {
        let users = await this.userSchema.find().exec();
        return users;
    }
    public async getUserPaging(page: number, keyword: string): Promise<IPagination<IUser>> {
        let query;
        if (keyword) {
            query = this.userSchema.find({
                $or: [
                    { email: keyword },
                    { first_name: keyword },
                    { last_name: keyword }
                ]
            })
        } else {
            query = this.userSchema.find()
        }
        let pageSize = parseInt(process.env.PAGE_SIZE!) || 5;
        let users = await query.skip((page - 1) * pageSize).limit(pageSize).exec();
        let totalRecord = await this.userSchema.count().exec();
        return {
            total: totalRecord,
            page: page,
            pageSize: pageSize,
            items: users
        } as IPagination<IUser>;
    }
}