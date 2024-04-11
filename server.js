const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: './config.env'});

const app  =  require("./index");

// console.log(process.env);

mongoose.connect(process.env.DB_CONN_URL).then(conn=>{
    console.log("DB Connected..");
}).catch(err => {
    console.log('Error in DB connection..',err);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server Started.....');
})
