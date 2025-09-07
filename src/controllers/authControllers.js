const bcrypt = require('bcrypt');
const connection = require('../db/connection');

// User registration

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const {u_email} = req.body;
    const authUser = "SELECT * FROM users WHERE u_email = ?"; // Check if email already exists, the email is unique
    connection.query(authUser, [u_email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.render('register', {message: 'The email is already in use'});
        } else {
            const {u_name, u_lastname, u_email, u_password, u_pfp} = req.body;
            const hashedPassword = await bcrypt.hash(u_password, 10);
            const newUser = "INSERT INTO users (u_name, u_lastname, u_email, u_password, u_pfp) VALUES (?, ?, ?, ?, ?)";
            connection.query(newUser, [u_name, u_lastname, u_email, hashedPassword, u_pfp], (err, results) => {
                if (err) throw err;
                return res.render('register', {message: 'User registered successfully'});
            });
        }
    });
}