const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel'); // Ensure this file exists and exports the Product model correctly
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Routes
app.get('/', (req, res) => {
    console.log("GET /");
    res.send("Hello rest Api");
});

app.get('/blog', (req, res) => {
    console.log("GET /blog");
    res.send("Hello Blog");
});

app.get('/products', async (req, res) => {
    console.log("GET /products");
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/product/:id', async (req, res) => {
    console.log(`GET /product/${req.params.id}`);
    try {
        const { id } = req.params;
        const product = await Product.findById(id); // Corrected this line
        res.status(200).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/products', async (req, res) => {
    console.log("POST /products");
    try {
        const products = await Product.create(req.body);
        res.status(200).json(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

app.put('/product/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: `Product with id ${id} not found`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        

    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
})

app.delete("/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} not found` });
        }
        res.status(200).json({ message: `Product with id ${id} deleted` });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:RH7!uPDjihEZu_h@blkgrnapi.q07j1.mongodb.net/Node-API?retryWrites=true&w=majority&appName=blkgrnAPI') // Verify the connection string
    .then(() => {
        console.log("Database Connected Mongodb");
        app.listen(3000, () => {
            console.log("Rest API is Running on Port 3000");
        });
    }).catch((err) => {
        console.log("Database Connection Error", err);
    });