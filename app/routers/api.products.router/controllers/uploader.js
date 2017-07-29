const multer = require('multer');
const multerGfs = require('multer-gridfs-storage');

function init(data) {
    const storage = multerGfs({ gfs: data.gfs });
    const multerUpload = multer({
        storage: storage,
        limits: {
            fileSize: data.maxUploadSize,
        },
    });

    return multerUpload.single('photo');
}

module.exports = { init };
