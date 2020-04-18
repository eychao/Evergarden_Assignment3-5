const express = require('express')
const router = express.Router();

const productModel = require("../model/product");

//Route for the Products Page
router.get("/",(req,res)=>{
    productModel.find()    //pull only status: "open" documents -->productModel.find({status:"Open"})
    .then((products)=>{
        const selectedProducts = products.map(product=>{
            return{             // inject to Dashboard
                //wanted to filtered you wanted to the /task/productDashboard
                id: product._id,
                img: product.img,
                name: product.name,
                price: product.price,
                description: product.description
            }
        });
        res.render("products",{    //Filter out info wanted returned into new array
            productData: selectedProducts       //display each product data in productDashboard
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database to Products Page: ${err}`));
});

module.exports = router;