const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const secretKey = 'Satya@123';
app.use(express.json()); // Parse JSON request bodies

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: "Golden",
        email: "golden@gmail.com"
    };

    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create token' });
        } else {
            res.json({ token, message: 'Login successful' });
        }
    });
});

app.post('/profile', tokenverify, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: "Invalid token" });
        } else {
            res.json({
                message: "Profile Accesed",
                authData
            });
        }
    });
});

function tokenverify(req, res, next) {
    const bearheader = req.headers['authorization'];
    if (typeof bearheader !== 'undefined') {
        const bearer = bearheader.split(" ")
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            message: "Token is not valid"
        });
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
