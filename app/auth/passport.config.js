const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = (app, data, sessionSecret) => {
    passport.use(new LocalStrategy((username, password, done) => {
        data.users.getUserByCredentials(username, password)
            .then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'Invalid username or password.',
                    });
                }
                return done(null, user);
            })
            .catch((error) => {
                return done(error);
            });
    }));

    app.use(cookieParser());
    app.use(session({
        name: 'session',
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.getById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = { init };
