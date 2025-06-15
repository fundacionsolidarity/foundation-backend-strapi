export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },

  cors: {
    headers: env.array('CORS_HEADERS', ['Content-Type', 'Authorization']),
    methods: env.array('CORS_METHODS', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']),
    credentials: env.bool('CORS_CREDENTIALS', true),
    enabled: true,
    origin: [
      'http://localhost:3000', //
      'https://www.fsolidaritycolombia.org', 
      'https://fsolidaritycolombia.org', 
      'https://api.fsolidaritycolombia.org' 
    ],
  }
});
