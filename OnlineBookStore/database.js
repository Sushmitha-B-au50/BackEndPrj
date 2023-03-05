// const express =  require ('express');
// const app = express();
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);

// // mongoose.connect("mongodb://127.0.0.1:27017/Online_BookStore", {useNewUrlParser: true, useUnifiedTopology: true}, 
// //     (err) => {
// //         if(err){
// //             console.log("Connection Failed", err)
// //         }
// //         else{
// //             console.log("Connection Success");
// //         }
// //     }
// // )

// //users collection
// const userSchema  = new mongoose.Schema(
//     {
//         Name: String,
//         Email: String,
//         Password: String,
//     }
// )
// //books collection 

// const bookSchema  = new mongoose.Schema(
//     {
//         BookName: String,
//         Bk_FrontCover: String,
//         Pages :String,  
//         Ratings: mongoose.Types.Decimal128,
//         Bk_BackCover:String,
//     }
// )

// const Books = new mongoose.model("Books",bookSchema);
// const Users = new mongoose.model("Users", userSchema);

// module.exports = {
// Users,Books
// }


// app.listen(8010, () => {
//     console.log("Listening to mongo db on the port 8010");
// })