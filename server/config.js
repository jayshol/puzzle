exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://jayshol:shiridibaba123@ds155862.mlab.com:55862/puzzle-database'
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'SOME_SECRET_STRING';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';