import passport from "passport";
import { Profile, Strategy, StrategyOptions } from "passport-github2";
import {User} from "../../models/user/user.model";
import config from "../../config";
import { UserProfile } from "../../models/user/profile/profile.model";


class GithubStrategySetup {
    private static GithubOptions: StrategyOptions = {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK,
    };
    public static async Setup(): Promise<void> {
        passport.serializeUser((user: any, done) => {
            done(null, user.oauthId);
        });

        passport.deserializeUser((id, done) => {

            const user = User.findOne({
                oauthId: id,
            });
            console.log(user);


            if(user){
                done(null, user);
            }

        });

        passport.use(
            new Strategy(
                this.GithubOptions,
                async (
                    _accessToken: any,
                    _refreshToken: any,
                    profile: Profile,
                    done: any
                ) => {
                    const user = {
                        username: profile.username as string,
                        oauthId: profile.id,
                        provider: profile.provider,
                        avatar: profile.photos![0].value,
                    };
            
                    const logged = await User.findOne({
                        oauthId: user.oauthId,
                    });
                    if (logged) {
                        return done(null, user);
                    }
                    let urs = await User.create(user);

                    await UserProfile.create({
                        user: urs._id,
                    });
                    return done(null, user);
                }
            )
        );
    }
}

GithubStrategySetup.Setup();