const LocalStrategy = require('passport-local');

const strategyConfig = (passport, data) => {
    const strategy = new LocalStrategy((username, password, done) => {
        data.users.findUserByCredentials(username, password)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((error) => {
                done(error, null);
            });
    });

    passport.use(strategy);
};
module.exports = strategyConfig;