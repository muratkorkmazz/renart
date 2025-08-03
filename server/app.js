const express = require('express');
const products = require("./products.json");



const app = express();




app.get('/', (req, res) => {
  res.render('index');  
})




app.get("/fetch-data",(req,res)=>{
  console.log(products);
  res.json(products)
})












// search api.....





app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});

