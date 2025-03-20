const express=require("express")
const mysql=require("mysql")
const app=express();
const port=3000;

const conexion=mysql.createConnection( {
     host:"localhost",
     user:"root",
     password:"",
     database:"datos"
});

app.set("view engine","ejs")
app.use(express.urlencoded(extended=false))
app.use(express.json())
// app.use(express.static('public'))
conexion.connect((err)=>{
    if (err) { 
        throw err;
    }
    else {
        console.log(" Conectado exitosamente ")
    }
    
})

app.listen(port,()=>{
    console.log('Server ejecutando en http://localhost:'+port);    
})

app.get('/',(req,res)=>{
    const listac="SELECT * FROM clients ";
    conexion.query(listac,(error,result)=>{
        if (error) throw error;     
        res.render('index',{clientes:result});  
    });
    
});

app.get("/edita/:id",(req,res)=>{
    const {id}=req.params;
    const busca="SELECT * FROM clients WHERE id="+id;
    conexion.query(busca,(err,result)=>{
        if (err) throw err;
        if (result.length>0) {
            const nombre = result[0].nombre;
            const telefono = result[0].telefono
            const direccion=result[0].direccion
            const estado =result[0].estado
            const municipio =result[0].municipio
            const pago =result[0].pago
           res.render("edita",{id:id,nombre:nombre,direccion:direccion,telefono:telefono,estado:estado,municipio:municipio,pago:pago})
           console.log(result)
        }
    })
});

app.get("/borra/:id",(req,res)=>{
    const {id}=req.params;
    const busca= `DELETE FROM clients WHERE  id='${id}' `;
    conexion.query(busca,(err,result)=>{
        if (err) throw err;
        if (result.length>0) [
           console.log(result)
        ]
    })
    res.redirect("/")
});

app.post('/inserta',(req,res)=>{

    const nombre = req.body.nombre;
    const telefono = req.body.telefono
    const direccion= req.body.direccion
    const estado = req.body.estado
    const municipio = req.body.municipio
    const pago = req.body.pago

    conexion.query("INSERT INTO clients SET ?",{nombre:nombre,telefono:telefono,direccion:direccion,estado:estado,municipio:municipio,pago:pago},(error,result)=>{
        if (error) throw error;     
        res.redirect('/');  
    });
    
});

app.post('/insertar',(req,res)=>{
    const id=req.body.id
    const nombre = req.body.nombre;
    const telefono = req.body.telefono
    const direccion= req.body.direccion
    const estado = req.body.estado
    const municipio = req.body.municipio
    const pago = req.body.pago
    conexion.query("UPDATE clients SET ? WHERE ?;",[{nombre:nombre,telefono:telefono,direccion:direccion,estado:estado,municipio:municipio,pago:pago},{id:id}],(error,result)=>{
        if (error) throw error;     
        res.redirect('/');  
        console.log("Actualizado")
    });
    
});

