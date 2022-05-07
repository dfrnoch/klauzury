import {IUser} from "../models/user/user.interface.ts"

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}