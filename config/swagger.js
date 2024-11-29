const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API Documentation for Final Test',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your deployed URL if necessary
                description: 'Development server',
            },
        ],
    },
    apis: ['./docApi/*.js'], // Path to the API docs in your route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
module.exports = swaggerDocs;
