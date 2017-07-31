function init(req, res, data) {
    const filter = {
        _id: req.params.id,
    };

    return new Promise((resolve) => {
        data.gfs.exist(filter, (err, found) => {
            if (err || !found) {
                return res.renderError('Image does not exist');
            }
            data.gfs
                .createReadStream(filter)
                .pipe(res);
            return resolve();
        });
    });
}

module.exports = { init };
