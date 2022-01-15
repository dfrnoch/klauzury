import * as jwt from 'jsonwebtoken';

import { Request, Response } from 'express';
import User from "../../../../models/User";

interface UserForm {
    email: string;
    password: string;
}

class RegisterController {
    public static register(req: Request, res: Response) {
        const { email, password }: UserForm = req.body;

        User.findOne({ email: email }, (err: any , user: Object) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error checking user',
                    error: err
                });
            }

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });

            } else {
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

                const token = jwt.sign({ email: email }, "process.env.JWT_SECRET" );


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