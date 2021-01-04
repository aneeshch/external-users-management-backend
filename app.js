const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// read env variables
dotenv.config();

const Admin = require('./models/admin');

// routes
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

// application/json
app.use(bodyParser.json());

const {
  HOST_NAME, DB_PORT_NO, DB_NAME, PORT_NO, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, VERSION,
} = process.env;

// Enable CORS
app.use(cors());

// routes
app.use(`/api/${VERSION}`, userRoutes);
app.use(`/api/${VERSION}/admin`, adminRoutes);

app.use((err, req, res)=>{
    console.log(err);
    res.status(400).json({ message: 'Something went wrong'});
});

// DB connection
mongoose
  .connect(
    `mongodb://${HOST_NAME}:${DB_PORT_NO}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    Admin.findOne().then((admin) => {
      // create admin
      if (!admin) {
        bcrypt
          .hash(ADMIN_PASSWORD, 12)
          .then((hashedPassword) => {
            const newAdmin = new Admin({
              name: ADMIN_NAME,
              email: ADMIN_EMAIL,
              password: hashedPassword,
            });
            newAdmin.save();
          });
      }
    });
    app.listen(PORT_NO, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT_NO}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });
