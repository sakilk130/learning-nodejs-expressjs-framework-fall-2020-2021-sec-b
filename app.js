//declaration
const express = require('express');
const bodyParser = require('body-parser');
const exSession = require('express-session');
const cookieParser = require('cookie-parser');
const login = require('./controller/login');
const home = require('./controller/home');
const logout = require('./controller/logout');
const user = require('./controller/user');
const app = express();

//config
app.set('view engine', 'ejs');

//middleware
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
app.use('/', home);
app.use('/logout', logout);
app.use('/user', user);

//route
app.get('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>');
});

//server startup
app.listen(3000, (error) => {
  console.log('express server started at 3000...');
});
