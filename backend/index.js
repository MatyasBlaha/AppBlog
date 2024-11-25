const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const postRouter = require('./routes/post')
const authRouter = require('./routes/auth')
const imageUploadRouter = require('./routes/imageUpload')

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/static', express.static('public', {
    maxAge: '1y', // Cache static assets for 1 year
    etag: true, // Enable ETag for cache validation
    lastModified: true,
}));

app.use('/posts', postRouter)
app.use('/auth', authRouter)
app.use('/imageUpload', imageUploadRouter)


app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ message: message });
});

app.listen(8080);