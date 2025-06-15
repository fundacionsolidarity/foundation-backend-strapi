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
    origin: env('CORS_ORIGIN', '*'),
    maxAge: env.int('CORS_MAX_AGE', 3600),
    expose: env.array('CORS_EXPOSE', []), 
    keepHeadersOnError: env.bool('CORS_KEEP_HEADERS_ON_ERROR', false),
    preflightContinue: env.bool('CORS_PREFLIGHT_CONTINUE', false),
    preflightMaxAge: env.int('CORS_PREFLIGHT_MAX_AGE', 86400),
    
  }
});
