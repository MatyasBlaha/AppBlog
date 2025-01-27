const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

const postRouter = require('./routes/post')
const authRouter = require('./routes/auth')
const imageUploadRouter = require('./routes/imageUpload')
const commentsRouter = require('./routes/comments')
const profileRouter = require('./routes/profile')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/static', express.static('public', {
    maxAge: '1y',
    etag: true,
    lastModified: true,
}));


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/comments', commentsRouter)
app.use('/posts', postRouter)
app.use('/profile', profileRouter)
app.use('/auth', authRouter)
app.use('/imageUpload', imageUploadRouter)


app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong.';
    res.status(status).json({ message: message });
});

app.listen(8080);