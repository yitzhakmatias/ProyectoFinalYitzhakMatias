require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Load Sequelize instance
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Public Routes
app.use('/api', userRoutes);

// Protected Routes
app.use('/api', taskRoutes);
// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Health Check
app.get('/', (req, res) => {
    res.send('API is running');
});

// Sync Sequelize and start the server
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); // Sync models to DB
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Database connection error:', err));

module.exports = app; // For testing purposes
