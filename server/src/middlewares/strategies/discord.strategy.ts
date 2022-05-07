import passport from "passport";
import { Profile, Strategy, StrategyOptions } from "passport-discord";
import {User} from "../../models/user/user.model";
import config from "../../config";
import { UserProfile } from "../../models/user/profile/profile.model";


class DiscordStrategySetup {
    private static DiscordOptions: StrategyOptions = {
        clientID: config.DISCORD_CLIENT_ID,
        clientSecret: config.DISCORD_CLIENT_SECRET,
        callbackURL: config.DISCORD_CALLBACK,
    };

    public static async Setup(): Promise<void> {
        passport.serializeUser((user: any, done) => {
            done(null, user.oauthId);
        });
        
        passport.deserializeUser((id, done) => {

            const user = User.findOne({
                oauthId: id,
            });

            if(user){
                done(null, user);
            }

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
                        avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=256`
                    };

                    await console.log(_accessToken);

                    const logged = await User.findOne({
                        oauthId: user.oauthId,
                    });
                    if (logged) {
                        return done(null, user);
                    }

                    const urs = await User.create(user);

                    await UserProfile.create({
                        user: urs._id,
                    });


                    return done(null, user);
                }
            )
        );
    }
}

DiscordStrategySetup.Setup();