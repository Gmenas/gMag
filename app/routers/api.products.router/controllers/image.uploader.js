const multer = require('multer');
const multerGfs = require('multer-gridfs-storage');

const acceptedFiles = [
    'image/gif',
    'image/png',
    'image/jpeg',
    'image/bmp',
];
const maxUploadSize = 3145728;

function init(data) {
    const storage = multerGfs({ gfs: data.gfs });
    const multerUpload = multer({
        storage: storage,
        limits: {
            fileSize: maxUploadSize,
        },
        fileFilter: (req, file, cb) => {
            if (acceptedFiles.indexOf(file.mimetype) < 0) {
                return cb(Error('Invalid image type.'));
            }
            return cb(null, true);
        },
    });

    return multerUpload.single('photo');
}

module.exports = { init };
