import { Request, Response } from "express";

class OauthController {
    public Redirect(_req: Request, res: Response): void {
        console.log("Redirect");
        res.redirect("http://localhost:3000/home");
    
    }
}

export default OauthController;