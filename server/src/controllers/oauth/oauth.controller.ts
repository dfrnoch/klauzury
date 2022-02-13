import { Request, Response } from "express";

class OauthController {
    public Redirect(_req: Request, res: Response): void {
        res.redirect("/home");
    }
}

export default OauthController;