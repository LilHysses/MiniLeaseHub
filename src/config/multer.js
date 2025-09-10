const path = require('path');
const multer = require('multer')

// Storage configuration for multer Profile Picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads/pfp'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp
    }
});

// Middleware to upload profile picture, use in routes
const upload = multer({ storage });
module.exports = upload;