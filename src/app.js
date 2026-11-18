const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');           // ← THÊM
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// http://localhost:3000/api-docs
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,   // giữ token khi reload
      displayRequestDuration: true,
      filter: true,                 // ô search endpoint
      tryItOutEnabled: true,        // bật "Try it out" mặc định
    },
    customSiteTitle: 'SportMaster API Docs',
  })
);

app.get('/api-docs.json', (req, res) => res.json(swaggerDocument));

app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use(errorHandler);

module.exports = app;