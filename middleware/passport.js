	const GoogleStrategy = require("passport-google-oauth20").Strategy;
	const passport = require("passport");
	const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = require('../helper/config');
	const { SignInUsingGoogle } = require("../controller/passport");

	passport.use(
		new GoogleStrategy(
			{
				clientID: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:8080/auth/google/callback",
				scope: ["profile", "email"],
			},
			async function (accessToken, refreshToken, profile, callback) {
				// console.log('Profile Data')
				// console.log("profile data",profile)
				await SignInUsingGoogle(profile,callback.req,callback.res)
				callback(null, profile);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});
