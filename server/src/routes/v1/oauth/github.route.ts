import { IRouter, Router } from "express";
import passport from "passport";
import OauthController from "../../../controllers/oauth/oauth.controller";


class GithubRouter {
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
            passport.authenticate("github", { scope: ["user"] })
        );

        this.router.get(
            "/callback",
            passport.authenticate("github", { failureRedirect: "/failed" }),
            this.controller.Redirect
        );
    }
}

const router = new GithubRouter().getRouter();

export default router;

