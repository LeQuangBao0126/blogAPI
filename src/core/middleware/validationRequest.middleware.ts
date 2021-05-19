import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import HttpException from '@core/Exception/http.exception';

export const validateMiddleware = (type: any, skip: boolean) => {
    return (req: any, res: any, next: any) => {
        //const model: UserRegisterDto = req.body;
        let user = plainToClass(type, req.body);
        validate(user, { skipMissingProperties: skip }).then((errors) => {
            if (errors.length > 0) {
                let messagesError: any = [];
                errors.forEach(error => {
                    messagesError.push(Object.values(error.constraints!)[0])
                })
                next(new HttpException(400, messagesError))
            } else {
                console.log('validation succeed');
            }
            next();
        })
    }
}