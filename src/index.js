require("./models/User");
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/authRoutes");
const app = express();
const requireAuth = require('./middleWares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');


app.use(bodyParser.json());
app.use(trackRoutes);
app.use(authRoutes);

const mongoUri = "mongodb+srv://admin:password1%23@cluster0.517nf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance');
})
mongoose.connection.on('error', (err)=>{
    console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) =>{

    res.send(`Your email: ${req.user.email}`);
});


app.listen(3000, ()=>{
    console.log("Listening on port 3000");
});