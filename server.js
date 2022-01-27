const express= require('express');
const app=express();
const errorMiddleware = require('./app/middlewares/error')

//database connection with our MongoDB
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//CORS middleware 
const cors = require("cors");
app.use(cors())

//route
require("./app/routes/customer.routes")(app);
require("./app/routes/user.routes")(app);

app.use(errorMiddleware)

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
