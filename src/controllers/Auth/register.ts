import jwt from 'jsonwebtoken';
import joi from 'joi';


import { Request, Response, NextFunction } from 'express';
import User from "../../models/User";
import { HttpException } from '../../exceptions/HttpException';

interface UserForm {
    email: string;
    password: string;
}

class RegisterController {
    public static register(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const { email, password }: UserForm = req.body;


        User.findOne({ email: email }, (err: any, user: Object) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error checking user'
                });
            }

            if (user) {
                const error = new HttpException(409, 'User already exists');
                return next(error);
                
            } else {
                const schema = joi.object({
                    email: joi.string().email().required(),
                    password: joi.string().min(6).required()
                });

                const result = schema.validate({ email, password });
                if (result.error) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid data'
                    });
                }




                const newUser = new User({
                        email: email,
                        password: password
                    });

                    newUser.save((err: any) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: 'Error saving user',
                                error: err
                            });
                        }
                        return
                    });

                    const token = jwt.sign({ email: email }, "process.env.JWT_SECRET");


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

export default RegisterController;