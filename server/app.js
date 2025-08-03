const express = require('express');
const products = require("./products.json");
const cors=require("cors");


const app = express();


app.use(cors());

app.get('/', (req, res) => {
  res.send("try ... ")  
})




app.get("/api/fetch-data",(req,res)=>{

  res.json(products)
})









app.listen(3000, () => {
  console.log('Server running at http://localhost:3001/');
});




