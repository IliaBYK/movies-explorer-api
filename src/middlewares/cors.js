const whitelist = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://bitfilms.ibyk.nomoredomainsclub.ru',
  'https://bitfilms.ibyk.nomoredomainsclub.ru',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

/* const corsOptions = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'content-type, Authorization');
      return res.end();
    }
  }

  return next();
}); */

export default corsOptions;
