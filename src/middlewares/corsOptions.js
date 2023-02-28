const whitelist = [
  'http://localhost:4000',
  'http://api.bitfilms.ibyk.nomoredomains.work',
  'https://api.bitfilms.ibyk.nomoredomains.work',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

export default corsOptions;
