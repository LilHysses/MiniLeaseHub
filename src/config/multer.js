const path = require('path');
const multer = require('multer')

// Storage configuration for multer Profile Picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder;

        // Decidir carpeta según el campo
        if (file.fieldname === 'pfp') {
            folder = 'pfp';
        } else if (file.fieldname === 'in_p1') {
            folder = 'properties/propertiesCard';
        } else {
            folder = 'properties/propertiesAll';
        }

        cb(null, path.join(__dirname, `../../public/uploads/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp
    }
});

// Middleware to upload profile picture, use in routes
const upload = multer({ storage });
module.exports = upload;