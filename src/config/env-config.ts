export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/test',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  base_url: {
    frontend: process.env.FRONTEND_URL || '',
  },
});
