const express = require('express')
const router = express.Router();
const productModel = require("../model/product"); 
const shoppingModel = require("../model/shoppingCart"); 
const moment = require('moment');
const userDashboard = require("../middleware/authorization");

router.get("/add", (req,res)=>{          //Route to Add Product Form
    res.render("shopping/productDes")
});

router.get("/add/:id",(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id, img, name, price, description, category, quantity} = product;
        res.render("shopping/productAdd",{
           _id,
            img,
            name,
            price,
            description,
            category,
            quantity         
        });
    })
    .catch(err=>console.log(`Error: ${err}`));
});
router.post("/add/:id", (req,res)=>{
    //insert into MongoDB database
    productModel.findById(req.params.id)
    const newProduct = {
        name: req.params.name,
        price: req.params.price,
        quantity: req.params.quantity,
        img: req.params.img
    }
    const product = new shoppingModel(newProduct); //create document to insert to database
    product.save()
    .then(()=>{
        res.redirect("/shopping/list");
    })
    .catch(err=>console.log(`Error happened when inserting in the database: ${err}`));
});


router.get("/list", (req,res)=>{         //Route to get all product list
    //pull from database, get products 
    //inject products into productDashboard
    shoppingModel.find()    //pull only status: "open" documents -->productModel.find({status:"Open"})
    .then((products)=>{
        const selectedProducts = products.map(product=>{
            //const dateCreated = moment(product.dateCreated).format('MMMM Do YYYY, h:mm:ss a'); //format date and time with moment.js
            return{             // inject to Dashboard
                //wanted to filtered you wanted to the /task/productDashboard
                id: product._id,
                img: product.img,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }
        });
        res.render("shopping/shoppingCart",{    //Filter out info wanted returned into new array
            productData: selectedProducts       //display each product data in productDashboard
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database: ${err}`));
});

router.delete("/delete/:id", (req,res)=>{    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/shopping/list");
    })
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));
});

module.exports = router;