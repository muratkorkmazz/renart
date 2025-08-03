const express = require('express');
const products = require("./products.json");



const app = express();



//Ejs setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Static files
// app.use(express.static('public'));


// cookie parser
// app.use(cookieParser());



// Body parser

// Parse application/json
// app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));




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
