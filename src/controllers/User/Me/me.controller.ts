// import { NextFunction, Request, Response } from 'express';
// import HttpException from '../../../exceptions/HttpException';
import { MeService } from './me.service';

export class UserController{
    private userService: MeService;

    constructor(){
        this.userService = new MeService();
    }

    
    
}