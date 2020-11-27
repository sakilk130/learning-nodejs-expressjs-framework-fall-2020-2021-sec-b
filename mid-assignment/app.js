const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const login = require('./controller/login');
const registration = require('./controller/registration');

const user = require('./controller/user/home');
const admin = require('./controller/admin/admin');
const scout = require('./controller/scout/scout');
const logout = require('./controller/admin/logout');

app.set('view engine', 'ejs');

//middleware
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  exSession({
    secret: 'my secret value',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cookieParser());

app.use('/login', login);
app.use('/logout', logout);
app.use('/registration', registration);
app.use('/user', user);
app.use('/admin', admin);
app.use('/scout', scout);

app.get('/', (req, res) => {
  res.send('OK');
});
app.get('*', (req, res) => {
  res.send('404 Not Found');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
