// Creating express aplication framework for node js
const express = require('express')
const app = express()

//Importing product model
const Product = require('./models/productModel')

//For product model to be understand JSON Post request
app.use(express.json())
//If we want to use Form URL and not json to update Database
app.use(express.urlencoded({extended: false}))

//Connect with Mongoose DB database
const mongoose = require('mongoose');

//Declare route to access website 
//Req = what client sends, res = what NODE API App Sends back
app.get('/', (req, res) => {
    res.send('Hello NODE API.')
})

//Create a route to the blog page when requested
app.get('/blog', (req, res) => {
    res.send('Hello blog, My name is Jeremy.')
})

//Fetch data from the database
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get a specific product ID, single product from database
app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Save data to the database, need to use data model (Use Product Model)
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Update data on the database for a product
app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //If we can't find the product to update in the database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        //if product is updated successfully
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete a product from the database
app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Connect to the Mongoose Database
mongoose.connect('mongodb+srv://admin:admin123@cluster0.xzwz2ho.mongodb.net/Node-API?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
        console.log('Node API app is running on port 3000.')
    })

}).catch((error) => {
    console.log(error)
})