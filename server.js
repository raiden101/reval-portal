const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 5000;

app.use(require('cors')());

const auth_routes = require('./server/auth');
const admin_routes = require('./server/admin');
const student_routes = require('./server/student');

const check_token_gen = require('./server/utils/check_token');
const admin_check_token = check_token_gen(admin_flag = true);
const student_check_token = check_token_gen(admin_flag = false);


const { db_url } = require('./credentials/credentials');
mongoose.connect(db_url, { useNewUrlParser: true })
.then(_ => console.log('connected to db'))
.catch(_ => console.log('error connecting to db'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', auth_routes);

app.use('/api/admin', admin_check_token, admin_routes);

app.use('/api/student', student_check_token, student_routes);

app.listen(port, () => console.log(`listening to port ${port}`))