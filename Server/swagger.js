const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'Documentation for WandrLust',
    },
    servers: [
      {
        url: 'https://wandrlust-server.fly.dev',
        description: 'Backend server',
      },
    ],
  },
  apis: ['./routes/user.js','./routes/agency.js','./routes/admin.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
