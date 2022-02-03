import passport from "passport";
import { Profile, Strategy, StrategyOptions } from "passport-discord";
import {User} from "../../models/user/user.model";
import config from "../../config";


class DiscordStrategySetup {
    private static DiscordOptions: StrategyOptions = {
        clientID: config.DISCORD_CLIENT_ID,
        clientSecret: config.DISCORD_CLIENT_SECRET,
        callbackURL: config.DISCORD_CALLBACK,
    };
    public static async Setup(): Promise<void> {
        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user: any, done) => {
            done(null, user);
        });

        passport.use(
            new Strategy(
                this.DiscordOptions,
                async (
                    _accessToken: any,
                    _refreshToken: any,
                    profile: Profile,
                    done: any
                ) => {
                    const user = {
                        username: profile.username,
                        oauthId: profile.id,
                        provider: profile.provider,
                    };
                    const logged = await User.findOne({
                        oauthId: user.oauthId,
                    });
                    if (logged) {
                        return done(null, user);
                    }
                    await User.create(user);

                    return done(null, user);
                }
            )
        );
    }
}

DiscordStrategySetup.Setup();