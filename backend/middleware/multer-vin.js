const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif' // if you want to allow .gif images, for example
    // Add any additional file types you expect for vins
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'topicFiles'); // Change destination to 'vinFiles'
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}-${Date.now()}.${extension}`); // Ensuring unique filenames
    }
});

const fileFilter = (req, file, callback) => {
    if (Object.keys(MIME_TYPES).includes(file.mimetype)) {
        callback(null, true); // Accept file
    } else {
        callback(null, false); // Reject file if not in the MIME_TYPES
    }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('file'); // Changed the field name to 'file' to match the controller
