const bcrypt = require('bcrypt');
const connection = require('../db/connection');

// User registration

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const {u_name, u_lastname, u_email, u_password} = req.body;
    const authUser = "SELECT * FROM users WHERE u_email = ?"; // Check if email already exists, the email is unique
    connection.query(authUser, [u_email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.render('register', {message: 'The email is already in use', messageType: 'error'});
        } else {
            const u_pfp = "/uploads/pfp/" + req.file.filename; // Save the path of the uploaded profile picture
            const hashedPassword = await bcrypt.hash(u_password, 10);
            const newUser = "INSERT INTO users (u_name, u_lastname, u_email, u_password, u_pfp) VALUES (?, ?, ?, ?, ?)";
            connection.query(newUser, [u_name, u_lastname, u_email, hashedPassword, u_pfp], (err, results) => {
                if (err) throw err;
                return res.render('register', {message: 'User registered successfully', messageType: 'success'});
            });
        }
    });
}

// User login

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.postLogin = (req, res) => {
    const {u_email, u_password} = req.body;
    const userValid = "SELECT * FROM users WHERE u_email = ?";
    connection.query(userValid, [u_email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.render('login', {message: 'The user does not exist', messageType: 'error' });
        } else {
            const user = results[0];
            const ValidPassword = await bcrypt.compare(u_password, user.u_password);
            if (ValidPassword) {
                delete user.u_password;
                req.session.user = user;
                return res.redirect('/');
            } else {
                return res.render('login', {message: 'Incorrect password', messageType: 'error' });
            }
        }
    });
}

// User logout
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
}