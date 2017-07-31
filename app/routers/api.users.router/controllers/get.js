function init(req, res, data) {
    if (!req.user) {
        return res.status(403).send('Forbidden!');
    }

    return data
        .users.getById(req.query.id)
        .then((user) => {
            const userToSend = {};

            if (user) {
                userToSend.username = user.username;
                userToSend.email = user.email;
            }

            res.send(userToSend);
        })
        .catch(res.renderError);
}

module.exports = { init };
