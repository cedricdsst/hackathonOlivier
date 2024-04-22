const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'video/mp4': 'mp4',
    'application/pdf': 'pdf' // Added for PDF support
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'topicFiles');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const fileFilter = (req, file, callback) => {
    if (Object.keys(MIME_TYPES).includes(file.mimetype)) {
        callback(null, true); // Accept file
    } else {
        callback(null, false); // Reject file
    }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('file');