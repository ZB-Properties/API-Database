const express = require('express');
const database = require('../database');

const router = express.Router();


router.post('/postproperty', async (req, res) => {
    const { title, description, type, price } = req.body;
    try {
        const result = await database.query(
            'INSERT INTO properties (title, description, type, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, type, price,  req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, type, price } = req.body;
    try {
        const result = await database.query(
            'UPDATE properties SET title = $1, description = $2, type = $3, price = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
            [title, description, type, price, id, req.user.id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: 'Property not found or unauthorized' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query('DELETE FROM properties WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Property not found or unauthorized' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.patch('/:id/sold', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query(
            "UPDATE properties SET status = 'sold' WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        );
        if (result.rowCount === 0) return res.status(404).json({ message: 'Property not found or unauthorized' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/allproperties', async (req, res) => {
    try {
        const result = await database.query('SELECT * FROM properties WHERE status = $1', ['available']);
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/propertytype', async (req, res) => {
    const { type } = req.query;
    try {
        const result = await database.query('SELECT * FROM properties WHERE type = $1 AND status = $2', [type, 'available']);
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/specificproperty/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database.query('SELECT * FROM properties WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Property not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
