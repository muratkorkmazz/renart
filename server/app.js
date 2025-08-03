const express = require('express');
const products = require("./products.json");
const cors=require("cors");


const app = express();


app.use(cors)

app.get('/', (req, res) => {
  res.send("try ... ")  
})




app.get("/fetch-data",(req,res)=>{
  console.log(products);
  res.json(products)
})












// search api.....





app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});


