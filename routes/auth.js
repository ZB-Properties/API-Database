const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../database');

const router = express.Router();


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await database.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
