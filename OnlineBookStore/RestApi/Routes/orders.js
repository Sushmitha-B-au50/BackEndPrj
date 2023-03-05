const  express=  require ('express');
const bodyParser = require('body-parser');
const router  = express.Router();
const mongoose = require('mongoose');
const Order =  require('../models/order');
const User =  require('../models/user');
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/',async(req,res,next)=> {  // this is to get All orders
    try{
    const result = await Order.find();     
    res.send(result);
    }
    catch{
        res.send('Error' + err);
    }
    });

router.post('/',async (req,res,next)=> {   // this is to get add order
    const order =  new Order({
        Name : req.body.Name,
        Email : req.body.Email,
        Books :JSON.stringify(req.body.Books),
        Address :JSON.stringify(req.body.Address),
        PhoneNumber : req.body.PhoneNumber,
        Total : req.body.Total
    });
    await order.save().then(result => {
        return res.send("order added succesfully " + order);
    })
    .catch(err => {
        res.status(500).json({
        error:err
        });
    });
});


router.put('/:Email',async (req,res,next)=> {  // this is to update order
    const orderToUpdate = await Order.findOneAndUpdate( {"Email":req.params.Email})
    orderToUpdate.Books = req.body.Books,
    orderToUpdate.Address = req.body.Address,
    orderToUpdate.PhoneNumber = req.body.PhoneNumber,
    orderToUpdate.Total = req.body.Total,
    await orderToUpdate.save().then(result => {
        return res.send("order updated successfully " + orderToUpdate);
    })
    .catch(err => {
        res.status(500).json({
        error:err
        });
    });

});


module.exports = router;