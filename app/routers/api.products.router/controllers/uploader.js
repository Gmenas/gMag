const multer = require('multer');
const multerGfs = require('multer-gridfs-storage');

const maxFileSize = 5242880; // 5MB

function init(data) {
    const storage = multerGfs({ gfs: data.gfs });
    const multerUpload = multer({
        storage: storage,
        limits: {
            fileSize: maxFileSize,
        },
    });

    return multerUpload.single('photo');
}

module.exports = { init };
