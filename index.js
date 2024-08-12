const express = require('express');
const bodyParser = require('body-parser');
const { addUser, getUser, updateUser, deleteUser } = require('./controller/userController');

const app = express();
app.use(bodyParser.json())

require('dotenv').config();


app.post('/adduser',addUser );
app.get('/getUser' , getUser);
app.put('/updateUser/:id', updateUser);
app.delete('/deleteUser/:id', deleteUser);

const port = 5000;

app.listen(port , ()=> {
    console.log("server runnig on port 5000")
})