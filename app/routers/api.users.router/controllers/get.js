function init(req, res, data) {
    if (!req.user) {
        return res
            .send({
                error: 'You must log in to see this.',
            });
    }

    return data
        .users.getByUsername(req.query.username)
        .then((user) => {
            const userToSend = {};

            if (user) {
                userToSend.username = user.username;
                userToSend.email = user.email;
            }

            res.send(userToSend);
        });
}

module.exports = { init };
