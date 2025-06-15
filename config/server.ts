export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://api.fsolidaritycolombia.org'), 
  app: {
    keys: env.array('APP_KEYS'),
  },

  cors: {
    enabled: env.bool('CORS_ENABLED', true),
    
    origin: env.array('CORS_ORIGIN', [
      'http://localhost:3000', 
      'https://www.fsolidaritycolombia.org',
      'https://fsolidaritycolombia.org',   
      'https://api.fsolidaritycolombia.org'
    ]),
    methods: env.array('CORS_METHODS', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']),
    headers: env.array('CORS_HEADERS', ['Content-Type', 'Authorization', 'Accept']),
    credentials: env.bool('CORS_CREDENTIALS', true),
    maxAge: env.int('CORS_MAX_AGE', 3600),
    expose: env.array('CORS_EXPOSE', []), 
    keepHeadersOnError: env.bool('CORS_KEEP_HEADERS_ON_ERROR', false),
    preflightContinue: env.bool('CORS_PREFLIGHT_CONTINUE', false),
    preflightMaxAge: env.int('CORS_PREFLIGHT_MAX_AGE', 86400),
  },
});
