require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();
app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/properties', authenticateToken, propertyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
