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

//orders collection
const orderSchema  = new mongoose.Schema(
    {
        Name: String,
        Email: String,
        Books:String,
        Address:String,
        PhoneNumber:Number,
        Total:mongoose.Types.Decimal128
    }
)

const Orders = new mongoose.model("Orders", orderSchema);

module.exports = Orders;