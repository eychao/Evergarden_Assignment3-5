const express = require('express')
const router = express.Router();
const productModel = require("../model/product"); 
const moment = require('moment');
const isAdmin = require("../middleware/isAdmin");
const userDashboard = require("../middleware/authorization");

router.get("/add",userDashboard, isAdmin, (req,res)=>{          //Route to Add Product Form
    res.render("task/productAdd")
});

router.post("/add",userDashboard, isAdmin, (req,res)=>{
    //insert into MongoDB database
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        bestseller: req.body.bestseller,
        img: req.body.img
    }
    const product = new productModel(newProduct); //create document to insert to database
    product.save()
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error happened when inserting in the database: ${err}`));
});

router.get("/list",userDashboard, isAdmin, (req,res)=>{         //Route to get all product list
    //pull from database, get products 
    //inject products into productDashboard
    productModel.find()    //pull only status: "open" documents -->productModel.find({status:"Open"})
    .then((products)=>{
        const selectedProducts = products.map(product=>{
            const dateCreated = moment(product.dateCreated).format('MMMM Do YYYY, h:mm:ss a'); //format date and time with moment.js
            return{             // inject to Dashboard
                //wanted to filtered you wanted to the /task/productDashboard
                id: product._id,
                img: product.img,
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                dateCreated: dateCreated
            }
        });
        res.render("task/productDashboard",{    //Filter out info wanted returned into new array
            productData: selectedProducts       //display each product data in productDashboard
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database: ${err}`));
});
router.get("/search",userDashboard, isAdmin, (req,res)=>{
    productModel.find()    //{category: req.body.catSearch} pull only status: "open" documents -->productModel.find({status:"Open"})
    .then((products)=>{
        const selectedProducts = products.map(product=>{
            const dateCreated = moment(product.dateCreated).format('MMMM Do YYYY, h:mm:ss a'); //format date and time with moment.js
            return{             // inject to Dashboard
                //wanted to filtered you wanted to the /task/productDashboard
                id: product._id,
                img: product.img,
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                dateCreated: dateCreated
            }
        });
        res.redirect("/task/list",{
        //res.render("task/productDashboard",{    //Filter out info wanted returned into new array
            productData: selectedProducts       //display each product data in productDashboard
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database using search: ${err}`));
});

router.get("/edit/:id",userDashboard, isAdmin, (req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id, img, name, price, description, category, quantity} = product;
        res.render("task/productEdit",{
           _id,
            img,
            name,
            price,
            description,
            category,
            quantity         
        });
    })
    .catch(err=>console.log(`Error happened when editing product in the database: ${err}`));
});

router.put("/update/:id",userDashboard, isAdmin, (req,res)=>{
    const product = {
        img: req.body.img,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity
    }
    productModel.updateOne({_id:req.params.id}, product) //update one document _id = URL id
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error happened when updating product in the database: ${err}`));
});

router.delete("/delete/:id",userDashboard, isAdmin, (req,res)=>{    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/task/list");
    })
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));
});

module.exports = router;