const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sushmitha:12345@onlinebookstore.web1em6.mongodb.net/Online_BookStore?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err) => {
        if(err){
            console.log("Connection Failed", err)
        }
        else{
            console.log("Connection Success");
        }
    }
)

//books collection 

const bookSchema  = new mongoose.Schema(
    {
        BookID : Number,
        BookName: String,
        Bk_FrontCover: String,
        Pages :String,  
        Ratings: Number,
        Bk_BackCover:String,
        Author:String,
        Price:mongoose.Types.Decimal128
    }
)

const Books = new mongoose.model("Books",bookSchema);

module.exports = Books;
