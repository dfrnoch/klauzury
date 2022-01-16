import jwt from 'jsonwebtoken';
import joi from 'joi';
import bcrypt from 'bcrypt';


import { Request, Response, NextFunction } from 'express';
import User from "../../models/User";
import { HttpException } from '../../exceptions/HttpException';

interface UserForm {
    email: string;
    password: string;
}

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});


class AuthController {
    
    public static login(req: Request, res: Response, next: NextFunction) {
        const { email, password }: UserForm = req.body;

        User.findOne({ email: email }, (err: any, user: any) => {
            if (err) {
                const error = new HttpException(500, 'Internal server error');
                return next(error);
            }

            if (!user) {
                const error = new HttpException(401, 'Unauthorized');
                return next(error);
            }

            bcrypt.compare(password, user.password).then((result: boolean) => {
                if (!result) {
                    const error = new HttpException(401, 'Unauthorized');
                    return next(error);
                }

                const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string);

                return res.status(200).json({
                    success: true,
                    message: 'User logged in',
                    token: token
                });
            });
        });

    }

    public static register(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const { email, password }: UserForm = req.body;


        User.findOne({ email: email }, (err: any, user: Object) => {
            if (err) {
                const error = new HttpException(500, 'Internal server error');
                return next(error);
            }

            if (user) {
                const error = new HttpException(409, 'User already exists');
                return next(error);
                
            } else {
                const result = schema.validate({ email, password });

                if (result.error) {
                    const error = new HttpException(400, 'Bad request');
                    return next(error);
                }




                const newUser = new User({
                        email: email,
                        password: password
                    });

                    newUser.save((err: any) => {
                        if (err) {
                            const error = new HttpException(500, 'Internal server error');
                            return next(error);
                        }
                        return
                    });

                    const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string);


                    return res.status(201).json({
                        success: true,
                        message: 'User created',
                        token: token
                    });
                }
            }
        );

    }
}

export default AuthController;