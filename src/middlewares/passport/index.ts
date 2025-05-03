import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy } from "passport-jwt";
import { jwtOptions } from "@/config/passport";
import passport from "passport";

// Estratégia JWT
passport.use(
    new JwtStrategy( jwtOptions, async ( user, done ) => {
        try {
            return done( null, user );
        } catch ( error ) {
            return done( error, false );
        };
    })
);

// Estratégia Google OAuth
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        async ( accessToken, refreshToken, user, done ) => {
            try {
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

export default passport;