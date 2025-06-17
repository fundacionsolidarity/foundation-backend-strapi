// Path: config/database.js

import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite'); // Default client is sqlite

  const connections = {
    mysql: {
      // Keep your existing MySQL configuration as is
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      // Conditional connection configuration for PostgreSQL
      connection: env('DATABASE_URL')
        ? // If DATABASE_URL is provided (e.g., by Railway), use it as the primary connection string
          {
            connectionString: env('DATABASE_URL'),
            // Crucial for Railway/cloud deployments with self-signed certificates
            // Set rejectUnauthorized to false by default for production if DATABASE_SSL is true,
            // but still allow overriding via DATABASE_SSL_REJECT_UNAUTHORIZED env var.
            ssl: env.bool('DATABASE_SSL', false) ? {
                rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false), // Set to false to bypass self-signed cert error
            } : false, // If DATABASE_SSL is false, then no SSL configuration
            schema: env('DATABASE_SCHEMA', 'public'), // Keep schema if needed
          }
        : // Fallback: If DATABASE_URL is NOT provided (e.g., local development with individual vars)
          {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            // SSL configuration for fallback - typically you might need rejectUnauthorized: false here too for local self-signed certs
            ssl: env.bool('DATABASE_SSL', false) && {
                rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false), // Often needed for local self-signed certs as well
            },
            schema: env('DATABASE_SCHEMA', 'public'),
          },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      // Keep your existing SQLite configuration as is
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client, // Use the client determined by DATABASE_CLIENT env var
      ...connections[client], // Spread the connection object based on the chosen client
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000), // Connection timeout
    },
  };
};
