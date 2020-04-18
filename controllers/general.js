const express = require('express')
const router = express.Router();

const productCat = require("../model/productCat");
const productModel = require("../model/product"); 

//Route for the Home Page
router.get("/",(req,res)=>{ 
    //pull from database, get products 
    //inject products into bestseller on homepage
    productModel.find({bestseller: "true"})    //filter bestsellers {category:req.body.catSearch}, products
    .then((products)=>{
        const selectedProducts = products.map(product=>{            
            return{             // inject to bestseller on homepage
                //wanted to filtered you wanted to the homepage
                img: product.img,
                price: product.price
            }
        });
        res.render("index",{    //Filter out info wanted returned into new array
            title:"Home",
            headingInfo: "Home Page",
            productsCat :productCat.getProductsCat(),
            productsBS: selectedProducts       //display each product data in homepage
        });
    })
    .catch(err=>console.log(`Error happened when pulling from the database: ${err}`));  
    /*res.render("index",{
        title:"Home",
        headingInfo: "Home Page",
        productsCat :productCat.getProductsCat(),
        productsBS :productBS.getBestseller()
    });*/

});


module.exports = router;