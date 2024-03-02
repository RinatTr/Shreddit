const cors = require('cors');
require('dotenv').config();

const { NODE_ENV, DEV_URL_CORS, PROD_URL_CORS } = process.env;

// Cors configuration for production and development environments
const corsConfig = () => {
    return cors({
            origin: NODE_ENV === 'production' ? PROD_URL_CORS : DEV_URL_CORS,
            credentials: true
        }) 
  };

  module.exports = corsConfig;