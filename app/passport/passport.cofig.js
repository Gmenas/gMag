const passport = require('passport');
const strategyConfig = require('./local.strategy.config');

const passportConfig = (app, data) => {
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.user_name);
        }
    });

    passport.deserializeUser((username, done) => {
        data.users.findByUserName(username)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => done(error, false));
    });

    strategyConfig(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());
};
module.exports = passportConfig;