import { IRouter, Router } from "express";
import passport from "passport";
import OauthController from "../../../controllers/oauth/oauth.controller";


class DiscordRouter {
    private _router: IRouter;
    private controller: OauthController;

    constructor() {
        this._router = Router();
        this.controller = new OauthController();

        this.initRoutes();
    }

    public getRouter(): IRouter {
        return this._router;
    }

    private initRoutes() {
        this._router.get(
            "/",
            passport.authenticate("discord", { scope: ["identify"] })
        );

        this._router.get(
            "/callback",
            passport.authenticate("discord", { failureRedirect: "/failed" }),
            this.controller.Redirect
        );
    }
}

const router = new DiscordRouter().getRouter();

export default router;

