const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true  
    },
    description: {
        type:String,
        required:true
    }, 
    category: {
        type:String,
        required:true
    }, 
    quantity: {
        type: Number,
        required: true  
    },  
    bestseller: {
        type: Boolean,
        required: true  
    }, 
    img: {
        type:String,
        required:true
    },  
    dateCreated: {
        type: Date,
        default: Date.now()
    }

});
 
const productModel = mongoose.model('Product', productSchema);   //Product--> is named "products" in database
module.exports = productModel;



/*const productsPage=
{
    fakeDB:[],
    init()
    {
        this.fakeDB.push({
            img: `/img/sayuri.png`,
            title:'Sansevieria Sayuri',
            description:`Succelents`,
            price:`29.99`});
    
        this. fakeDB.push({
            img: `/img/agChoco.png`,
            title:`Aglaonema Chocolate`,
            description:`Aglaonema`,
            price:`39.99`});
    
        this.fakeDB.push({
            img: `/img/hoyaMac.png`,
            title:'Hoy Macrophylla',
            description:`Flowering`,
            price:`43.99`});
        this.fakeDB.push({
            img: `/img/jgdt.png`,
            title:'Jasmine Grand Duke of Tuscany',
            description:`Flowering`,
            price:`75.00`});
    
         this. fakeDB.push({
            img: `/img/bonMini3.png`,
            title:`Bonsai Mini 3`,
            description:`Bonsai`,
            price:`25.00`});
    
        this.fakeDB.push({
            img: `/img/bonJun.png`,
            title:'Bonsai Juniper',
            description:`Bonsai`,
            price:`32.99`});   },
    getAllProducts()
    {
        return this.fakeDB;
    }
}
productsPage.init();
module.exports=productsPage;*/