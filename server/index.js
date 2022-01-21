const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contacts.routes');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', contactsRouter);
app.use('/auth', authRouter);

app.listen(PORT);
