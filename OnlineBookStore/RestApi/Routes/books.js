const  express=  require ('express');
const bodyParser = require('body-parser');
const router  = express.Router();
const mongoose = require('mongoose');
const Book =  require('../models/book');
const cloudinary =  require('../Images/ImageUpload');
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/',async(req,res,next)=> {  //to get all books
    try{
    const result = await Book.find();     
    res.send(result);
    }
    catch{
        res.send('Error' + err);
    }
    });
     

router.post('/',async (req,res,next)=> {   // to add the book  using cloudinary to directly storing the images
        try{
        const frontcover = await cloudinary.uploader.upload(req.body.Bk_FrontCover,{
            public_id :'Bk_FrontCover'+ req.body.BookID,
            width:510,
            height:500,
            crop:'fill',
            folder:'Books'
        });
        const backcover = await cloudinary.uploader.upload(req.body.Bk_BackCover,{
            public_id :'Bk_BackCover ' + req.body.BookID,
            width:510,
            height:500,
            crop:'fill',
            folder:'Books'
        });
        const pages = await cloudinary.uploader.upload(req.body.Pages,{
            public_id :'Bk_Pages'+ req.body.BookID,
            width:500,
            height:500,
            crop:'fill',
            folder:'Books'
        });
        const book =  new Book({
            BookID : req.body.BookID,
            BookName : req.body.BookName,
            Bk_FrontCover :frontcover.secure_url,
            Pages :pages.secure_url,
            Ratings : req.body.Ratings,
            Bk_BackCover :backcover.secure_url,
            Author:req.body.Author,
            Price:req.body.Price
        });
    
        const result = await book.save();
        return res.send("book added succesfully " + result);

    }
    catch(err){
       return res.status(500).json({
                    error:err
    })
}
});

    

router.put('/:id',async (req,res,next)=> {  //to update book
    const bookToUpdate = await Book.findOneAndUpdate( {"BookID":req.params.id})
 
    if(!bookToUpdate){
        res.send("book not found");
        return;
    }
    const frontcover = await cloudinary.uploader.upload(req.body.Bk_FrontCover,{
        public_id :'Bk_FrontCover',
        width:510,
        height:500,
        crop:'fill',
    });
    const backcover = await cloudinary.uploader.upload(req.body.Bk_BackCover,{
        public_id :'Bk_BackCover',
        width:510,
        height:500,
        crop:'fill',
    });
    const pages = await cloudinary.uploader.upload(req.body.Pages,{
        public_id :'Bk_Pages',
        width:500,
        height:500,
        crop:'fill',
    });

    bookToUpdate.BookName = req.body.EmployeeName,
    bookToUpdate.BookID =req.params.id,
    bookToUpdate.Ratings =req.body.Ratings,
    bookToUpdate.Bk_FrontCover = frontcover.secure_url;
    bookToUpdate.Bk_BackCover = backcover.secure_url;
    bookToUpdate.pages = pages.secure_url;
    bookToUpdate.Author = req.body.Author;
    bookToUpdate.Price = req.body.Price;

    await bookToUpdate.save().then(result => {
        return res.send("book updated successfully " + bookToUpdate);
    })
    .catch(err => {
        res.status(500).json({
        error:err
        });
    });

});

router.delete('/:id',async (req,res,next)=> {   // to delete the book
   await Book.deleteOne({"BookID":req.params.id}).then(result => {
        return res.send("book deleted successfully " );
    })
    .catch(err => {
        res.status(500).json({
        error:err
        });
    });
});


router.get('/:id',async(req,res,next)=> {   //getbyID
    try{
    const result = await Book.find({"BookID":req.params.id});     
    res.send(result);
    }
    catch{
        res.send('Error' + err);
    }
    });



router.put('/ratings/:id',async (req,res,next)=> {  //this to update ratings giving by user 
    const bookToUpdate = await Book.findOneAndUpdate({"BookID":req.params.BookID});
    try{
    if(!bookToUpdate){
        res.send("book not found");
        return;
    }
    bookToUpdate.Ratings = Number(bookToUpdate.Ratings + Number(req.body.Ratings))/2;
    await bookToUpdate.save().then(result => { 
      return res.send("ratings updated " + bookToUpdate.Ratings);
    })
   
    } 
    catch(err)
        {
            return res.send("Error" + err);
        } 
    });

module.exports = router;