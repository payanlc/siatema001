const express=require("express");
const mongoose=require("mongoose");
const Product=require("./models/product.model.js");
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:false}));
mongoose.connect("mongodb+srv://admin:5tzwOmi8FGUwj9uR@backenddb.sut3l.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then (()=>{
    console.log("Conectado exitosamente");
})
.catch(()=>{
    console.log("Fallo en la conexion a la ND")
});

app.listen(3000, ()=> {
    console.log(" Server corriendo en http://localhost:3000");

});

app.get("/",(req,res)=>{
    res.send("HOLA  desde API desde Node")
})

app.post("/api/products", async (req,res)=>{
   try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
   } catch (error) {
    res.status(500).json({message:error.message})
   }
});

app.get('/api/products',async(req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/api/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.put('/api/products/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
       
        if (!product){
            return res.status(404).json({message:"Producto no encontrado"});
        } else {
            const updatedPrduct= await Product.findByIdAndUpdate(id,req.body);
            res.status(200).json(updatedPrduct);
        
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }

});

app.delete('/api/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findByIdAndDelete(id);
        if (!product){
            return res.status(404).json({message:"Producto no encontrado"});
        }
        res.status(200).json({message:"Producto eliminado exitsamente"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
