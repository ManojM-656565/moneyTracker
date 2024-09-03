const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const Transaction=require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');

app.use(cors());

app.use(express.json());

app.get('/api/test',(req,res)=>{
    res.json('test ok');
});

app.post('/api/transaction',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    
    const {name,description,datetime,price}=req.body;
     const transaction=await Transaction.create({name,description,datetime,price})
    res.json(transaction)


})
app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions =await Transaction.find();
    res.json(transactions);
})
app.delete('/api/transaction/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    const result = await Transaction.findByIdAndDelete(id);
    if (result) {
        res.json({ message: 'Transaction deleted successfully' });
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

app.put('/api/transaction/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    const updates = req.body;
    const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});app.put('/api/transaction/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    const updates = req.body;
    const transaction = await Transaction.findByIdAndUpdate(id, updates, { new: true });
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

app.listen(4000);