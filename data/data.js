const multer = require('multer');
const multerGfs = require('multer-gridfs-storage');

const CategoryData = require('./category.data');
const ProductData = require('./product.data');
const UserData = require('./user.data');
const SessionData = require('./session.data');

const maxFileSize = 5242880; // 5MB

function init({ db, gfs }) {
    const storage = multerGfs({ gfs: gfs });

    return Promise.resolve({
        categories: new CategoryData(db),
        products: new ProductData(db),
        users: new UserData(db),
        session: new SessionData(db),
        gfs: gfs,
        multerUpload: multer({
            storage: storage,
            limits: {
                fileSize: maxFileSize,
            },
        }),
    });
}

module.exports = { init };
