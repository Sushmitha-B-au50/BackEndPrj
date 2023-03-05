const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://sushmitha:12345@onlinebookstore.web1em6.mongodb.net/Online_BookStore?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err) => {
        if(err){
            console.log("Connection Failed", err)
        }
        // else{
        //     console.log("Connection Success");
        // }
    }
)

//users collection
const userSchema  = new mongoose.Schema(
    {
        Name: String,
        Email: String,
        Password: String,
    }
)

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;