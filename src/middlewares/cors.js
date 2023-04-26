const {
  ALLOWED_CORS = ['http://localhost:3000',
    'http://bitfilms.ibyk.nomoredomainsclub.ru',
    'https://bitfilms.ibyk.nomoredomainsclub.ru'],
} = process.env;
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PATCH,POST,DELETE';
const DEFAULT_ALLOWED_HEADERS = 'content-type, Authorization';

export default ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_HEADERS);
      return res.end();
    }
  }

  return next();
});
