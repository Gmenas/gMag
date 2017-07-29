function init(req, res, data) {
    const filter = {
        _id: req.params.id,
    };

    data.gfs.exist(filter, (err, found) => {
        if (err || !found) {
            return res.renderError('Image does not exist');
        }
        return data.gfs
            .createReadStream(filter)
            .pipe(res);
    });
}

module.exports = { init };
