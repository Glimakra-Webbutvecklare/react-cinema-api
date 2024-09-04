const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'React Cinema API',
        version: '1.0.0',
        description: 'API documentation for React Cinema application',
      },
      servers: [
        {
            url: 'https://cinema-api.henrybergstrom.com/api/v1',
            description: 'Production server',
        },
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Development server',
        }
      ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Path to the API routes files
  };
  
  const specs = swaggerJsdoc(options);
  
  module.exports = specs;