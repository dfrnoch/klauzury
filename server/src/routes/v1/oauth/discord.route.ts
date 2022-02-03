import { IRouter, Router } from "express";
import passport from "passport";
import OauthController from "../../../controllers/oauth/oauth.controller";


class DiscordRouter {
    private router: IRouter;
    private controller: OauthController;

    constructor() {
        this.router = Router();
        this.controller = new OauthController();

        this.initRoutes();
    }

    public getRouter(): IRouter {
        return this.router;
    }

    private initRoutes() {
        this.router.get(
            "/",
            passport.authenticate("discord", { scope: ["identify"] })
        );

        this.router.get(
            "/callback",
            passport.authenticate("discord", { failureRedirect: "/failed" }),
            this.controller.Redirect
        );
    }
}

const router = new DiscordRouter().getRouter();

export default router;

